import { Body, Controller, Post, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiResponse, ApiOperation, ApiBody } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

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

}
