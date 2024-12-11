import { Module } from '@nestjs/common';
import { PrismaService } from 'src/config/prisma.service';
import { SaidaController } from './saida.controller';
import { SaidaService } from './saida.service';

@Module({
  controllers: [SaidaController],
  providers: [SaidaService, PrismaService],
})
export class SaidaModule {}
