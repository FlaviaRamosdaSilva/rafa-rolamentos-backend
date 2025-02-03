import { MailerService } from '@nestjs-modules/mailer';
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../config/prisma.service'; // Importa o PrismaService
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private prisma: PrismaService,
    private mailerService: MailerService,
  ) {}

  async signIn(
    email: string,
    password: string,
  ): Promise<{ access_token: string; email: string; id: string }> {
    const user = await this.userService.findOne(email);
    if (!user || user.senha !== password) {
      throw new UnauthorizedException();
    }
    const payload = { username: user.email, senha: user.senha };
    return {
      access_token: await this.jwtService.signAsync(payload),
      email: user.email,
      id: user.id,
    };
  }

  // token de quem esqueceu a senha:

  async signUp(data: Prisma.UserCreateInput) {
    return this.prisma.user.create({ data });
  }

  async validateUser(email: string, password: string) {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });
    return user;
  }

  ///Aqui é minha parte:
  async sendRecoverPasswordEmail(email: string): Promise<void> {
    // Busca o usuário pelo email
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new NotFoundException('Não há usuário cadastrado com esse email.');
    }

    // Gera um token de recuperação e atualiza o usuário no banco de dados
    const recoverToken = this.jwtService.sign(
      { email: user.email }, // payload com email do usuário
      { expiresIn: '1h' }, // o token expira em 1 hora
    );

    await this.prisma.user.update({
      where: { email },
      data: { recoverToken },
    });

    const recoveryLink = `https://rafa-rolamentos.vercel.app/users/reset-password/${recoverToken}`;

    // Configuração do email
    const mail = {
      to: user.email,
      from: 'noreply@rafarolamentos.com',
      subject: 'Recuperação de senha',
      template: 'recover-password',
      context: {
        token: recoveryLink, // O token é passado para o template do email
      },
    };

    // Envia o email
    await this.mailerService.sendMail(mail);
  }
}
