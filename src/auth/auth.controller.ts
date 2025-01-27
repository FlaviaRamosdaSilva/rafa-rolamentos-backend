import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { AuthService } from './auth.service';
import { RecoverPasswordDto } from './recover-password.dto';
import { signInDto } from './signin.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  async signIn(@Body(ValidationPipe) signInDto: signInDto) {
    await this.authService.signIn(signInDto.email, signInDto.senha);
    return {
      message: 'Login efetuado com sucesso',
    };
  }

  @Post('/signup')
  async signUp(
    @Body(ValidationPipe) data: CreateUserDto,
    ): Promise<{ message: string }> {
    await this.authService.signUp(data);
   return {
     message: 'Cadastro realizado com sucesso',
   };
  }

  @Post('recover-password')
  async recoverPassword(
    @Body(ValidationPipe) recoverPasswordDto: RecoverPasswordDto,
  ): Promise<{ message: string }> {
    await this.authService.sendRecoverPasswordEmail(recoverPasswordDto.email);
    return {
      message:
        'Se um usuário com este email existe, as instruções foram enviadas.',
    };
  }
}
