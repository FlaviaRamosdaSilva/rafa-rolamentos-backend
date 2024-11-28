import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClienteModule } from './clinte/cliente.module';
import { PrismaModule } from './config/prisma.module';
import { ProdutoModule } from './produto/produto.module';
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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
