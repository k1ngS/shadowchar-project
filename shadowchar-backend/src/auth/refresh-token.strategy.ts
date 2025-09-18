import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          // Extrai o token do cookie
          return request?.cookies?.refresh_token;
        },
      ]),
      secretOrKey: configService.getOrThrow<string>('JWT_REFRESH_SECRET'),
      passReqToCallback: true, // Permite acessar o objeto Request no método validate
    });
  }

  validate(req: Request, payload: any) {
    const refreshToken = req.cookies.refresh_token;
    // Anexa o usuário (payload) e o refresh token ao objeto request
    return { ...payload, refreshToken };
  }
}