import {
  ConflictException,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async register(registerDto: RegisterDto) {
    const { email, password: plainPassword } = registerDto;
    const existingUser = await this.prisma.user.findUnique({
      where: { email },
    });
    if (existingUser) {
      throw new ConflictException('Um usuário com este e-mail já existe.');
    }
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(plainPassword, salt);
    const user = await this.prisma.user.create({
      data: { email, password: hashedPassword },
    });
    const { password, ...result } = user;
    return result;
  }

 async validateUser(email: string, pass: string): Promise<any> {
  console.log('--- [AUTH] Tentando validar o usuário:', email);

  const user = await this.prisma.user.findUnique({ where: { email } });

  if (!user) {
    console.log('--- [AUTH] ERRO: Usuário não encontrado no banco de dados.');
    return null;
  }

  console.log('--- [AUTH] Usuário encontrado. Comparando senhas...');

  const pwMatches = await bcrypt.compare(pass, user.password);

  console.log('--- [AUTH] Senha enviada:', pass);
  console.log('--- [AUTH] Hash no banco:', user.password);
  console.log('--- [AUTH] Resultado da comparação (bcrypt):', pwMatches);

  if (pwMatches) {
    console.log('--- [AUTH] Validação bem-sucedida!');
    const { password, ...result } = user;
    return result;
  }

  console.log('--- [AUTH] ERRO: Senhas não conferem.');
  return null;
}

  async login(user: any) {
    const tokens = await this.getTokens(user.id, user.email);
    await this.updateRefreshTokenHash(user.id, tokens.refreshToken);
    return tokens;
  }

  async logout(userId: number) {
    // Apaga o hash do refresh token do banco de dados
    await this.prisma.refreshToken.deleteMany({
      where: {
        userId: userId,
      },
    });
    return { message: 'Logout bem-sucedido' };
  }

   async refreshTokens(userId: number, rt: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        // Inclui o refreshToken relacionado na busca
        refreshToken: true,
      },
    });

    // A validação agora checa o refreshToken aninhado
    if (!user || !user.refreshToken) {
      throw new ForbiddenException('Acesso Negado');
    }

    const rtMatches = await bcrypt.compare(rt, user.refreshToken.hashedToken);
    if (!rtMatches) {
      throw new ForbiddenException('Acesso Negado');
    }

    const tokens = await this.getTokens(user.id, user.email);
    await this.updateRefreshTokenHash(user.id, tokens.refreshToken);
    return tokens;
  }

  async getProfile(user: { sub: number }) {
    const profile = await this.prisma.user.findUnique({
      where: { id: user.sub },
    });

    if (!profile) {
      throw new UnauthorizedException('Usuário não encontrado.');
    }

    const { password, ...result } = profile;
    return result;
  }

 private async updateRefreshTokenHash(userId: number, refreshToken: string) {
    const salt = await bcrypt.genSalt();
    const hashedToken = await bcrypt.hash(refreshToken, salt);

    // Usa upsert na tabela RefreshToken
    await this.prisma.refreshToken.upsert({
      where: {
        // A condição para encontrar um token existente é o userId
        userId: userId,
      },
      update: {
        // O que fazer se encontrar: atualiza o hash
        hashedToken: hashedToken,
      },
      create: {
        // O que fazer se não encontrar: cria um novo registro
        userId: userId,
        hashedToken: hashedToken,
      },
    });
  }

  private async getTokens(userId: number, email: string) {
    const payload = {
      sub: userId,
      email,
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: this.configService.getOrThrow<string>('JWT_SECRET'),
        expiresIn: '15m',
      }),
      this.jwtService.signAsync(payload, {
        secret: this.configService.getOrThrow<string>('JWT_REFRESH_SECRET'),
        expiresIn: '7d',
      }),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }
}
