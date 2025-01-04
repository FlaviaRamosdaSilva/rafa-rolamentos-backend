import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ClienteModule } from './cliente/cliente.module';
import { mailerConfig } from './config/mailer.config';
import { PrismaModule } from './config/prisma.module';
import { EntradaModule } from './entrada/entrada.module';
import { ProdutoModule } from './produto/produto.module';
import { SaidaModule } from './saida/saida.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    MailerModule.forRoot(mailerConfig),
    PrismaModule,
    UserModule,
    ClienteModule,
    ProdutoModule,
    SaidaModule,
    EntradaModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
