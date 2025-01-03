import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../auth/constants';
import { PrismaService } from '../config/prisma.service'; // Importa o PrismaService
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [
    UserModule,
    MailerModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '18000s' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, PrismaService], // Adiciona PrismaService aos providers
  exports: [AuthService],
})
export class AuthModule {}
