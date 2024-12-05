import { Module } from '@nestjs/common';
import { PrismaService } from '../config/prisma.service';
import { ProdutoController } from './produto.controller';
import { ProdutoService } from './produto.service';

@Module({
  controllers: [ProdutoController],
  providers: [ProdutoService, PrismaService],
})
export class ProdutoModule {}
