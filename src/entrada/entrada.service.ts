import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../config/prisma.service';
import { CreateEntradaDto } from './dto/create-entrada.dto';
import { UpdateEntradaDto } from './dto/update-entrada.dto';

@Injectable()
export class EntradaService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createEntradaDto: CreateEntradaDto) {
    const { itens } = createEntradaDto;

    // Extrair os IDs dos produtos
    const produtoIds = itens.map((item) => item.produtoId);

    // Validar se os IDs existem no banco de dados
    const produtosExistentes = await this.prisma.produto.findMany({
      where: { id_produto: { in: produtoIds } },
      select: { id_produto: true },
    });

    const produtosNaoEncontrados = produtoIds.filter(
      (id) => !produtosExistentes.some((produto) => produto.id_produto === id),
    );

    if (produtosNaoEncontrados.length > 0) {
      throw new Error(
        `Os seguintes IDs de produtos não existem: ${produtosNaoEncontrados.join(', ')}`,
      );
    }

    // Calculando o total de cada item
    const itensComTotal = itens.map((item) => ({
      ...item,
      total_item: item.custo * item.quantidade, // custo * quantidade
    }));

    // Calculando o valor total da compra
    const valor_total_compra = itensComTotal.reduce(
      (total, item) => total + item.total_item,
      0,
    );

    // Inserindo a compra e os itens relacionados
    return await this.prisma.compras.create({
      data: {
        fornecedor: createEntradaDto.fornecedor,
        valor_total_compra,
        itens: {
          create: itensComTotal, // Adiciona os itens calculados
        },
      },
      include: {
        itens: true, // Retorna também os itens na resposta
      },
    });
  }

  async findAll() {
    return await this.prisma.compras.findMany({
      include: {
        itens: true, // Retorna os itens na resposta
      },
    });
  }

  async updateById(id: string, UpdateEntradaDto: UpdateEntradaDto) {
    // Verifica se o o id da compra existe
    const EntradaExist = await this.prisma.compras.findUnique({
      where: { id_compras: id },
    });

    if (!EntradaExist) {
      throw new NotFoundException(
        'Compra não localizada par aalteração de status.',
      );
    }

    // Atualiza o status da compra
    return this.prisma.compras.update({
      where: { id_compras: id },
      data: {
        status_compra: UpdateEntradaDto.status_compra, // Atualiza apenas os campos enviados no DTO
      },
    });
  }
}
