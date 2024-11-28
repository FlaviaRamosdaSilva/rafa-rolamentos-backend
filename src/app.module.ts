import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClienteModule } from './cliente/cliente.module';
import { PrismaModule } from './config/prisma.module';
import { EntradaModule } from './entrada/entrada.module';
import { ProdutoModule } from './produto/produto.module';
import { SaidaModule } from './saida/saida.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env.development.local',
    }),
    PrismaModule,
    UserModule,
    ClienteModule,
    ProdutoModule,
    SaidaModule,
    EntradaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
