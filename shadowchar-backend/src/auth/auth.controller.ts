import {
  Body,
  Controller,
  Post,
  UseGuards,
  Request,
  Get,
  HttpStatus,
  HttpCode,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiResponse, ApiOperation, ApiBody } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';
import { ConfigService } from '@nestjs/config';
import express from 'express';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  @Post('register')
  @ApiOperation({ summary: 'Registra um novo usuário' }) // Descreve a operação
  @ApiResponse({
    status: 201,
    description: 'O usuário foi criado com sucesso.',
  })
  @ApiResponse({ status: 409, description: 'O e-mail já está em uso.' })
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Realiza o login de um usuário' })
  @ApiBody({ type: LoginDto })
  async login(
    @Request() req,
    @Res({ passthrough: true }) response: express.Response,
    @Body() loginDto: LoginDto
  ) {
    const tokens = await this.authService.login(req.user);

    response.cookie('refresh_token', tokens.refreshToken, {
      httpOnly: true,
      secure: this.configService.get<string>('NODE_ENV') !== 'development',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 dias
    });

    return { accessToken: tokens.accessToken };
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Realiza o logout do usuário' })
  async logout(@Request() req, @Res({ passthrough: true }) response: express.Response) {
    await this.authService.logout(req.user.sub);
    response.clearCookie('refresh_token');
    return { message: 'Logout bem-sucedido' };
  }

  @UseGuards(AuthGuard('jwt-refresh')) // Protege com a nova estratégia
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Gera um novo access token usando o refresh token' })
  async refreshTokens(
    @Request() req,
    @Res({ passthrough: true }) response: express.Response,
  ) {
    const userId = req.user.sub;
    const refreshToken = req.user.refreshToken;
    const tokens = await this.authService.refreshTokens(userId, refreshToken);

    response.cookie('refresh_token', tokens.refreshToken, {
      httpOnly: true,
      secure: this.configService.get('NODE_ENV') !== 'development',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 dias
    });

    return { access_token: tokens.accessToken };
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  @ApiOperation({ summary: 'Obtém o perfil do usuário logado ' })
  @ApiResponse({
    status: 200,
    description: 'Perfil do usuário retornado com sucesso.',
  })
  getProfile(@Request() req) {
    return this.authService.getProfile(req.user);
  }
}
