import { Module } from '@nestjs/common';
import { ProdutoService } from 'src/produto/produto.service';
import { PrismaService } from '../config/prisma.service';
import { EntradaController } from './entrada.controller';
import { EntradaService } from './entrada.service';

@Module({
  controllers: [EntradaController],
  providers: [EntradaService, PrismaService, ProdutoService],
})
export class EntradaModule {}
