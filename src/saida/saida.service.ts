import { BadRequestException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';
import { PrismaService } from '../config/prisma.service';
import { CreateSaidaDto } from './dto/create-saida.dto';
import { PedidoProdutoDto } from './dto/saida-produto.dto';

// Definindo o tipo com o payload esperado
// Foi preciso para incluir os itens que eu queria que aparecesse n resposta do backend
type PedidoComProdutos = Prisma.pedidoGetPayload<{
  include: {
    produtos: {
      include: {
        Produto: {
          select: { codigo_produto: true; descricao_produto: true };
        };
      };
    };
  };
}>;
@Injectable()
export class SaidaService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createSaidaDto: CreateSaidaDto) {
    const {
      clienteId,
      tipo_cliente,
      desconto = 0,
      motivo_desconto,
      status_pedido = 'ORÇAMENTO',
      produtos,
    } = createSaidaDto;

    // Validação básica de um pedido ter produtos:
    if (!produtos || produtos.length === 0) {
      throw new BadRequestException(
        'O pedido deve conter ao menos um produto.',
      );
    }

    // criando as variaveis para os calculos:
    let preco_total = new Decimal(0);
    let custo_total = new Decimal(0);
    let quantidade_total_produtos = 0;

    // Processar os produtos e calcular totais
    const produtosProcessados = await Promise.all(
      produtos.map(async (produtoDto: PedidoProdutoDto) => {
        const { produtoId, quantidade } = produtoDto;

        // Buscar o produto no banco de dados
        const produto = await this.prisma.produto.findUnique({
          where: { id_produto: produtoId },
        });

        if (!produto) {
          throw new BadRequestException(
            `Produto com ID ${produtoId} não encontrado`,
          );
        }

        // Determinar o preço de venda (lojista ou distribuidor)
        const preco_venda =
          tipo_cliente === 'lojista'
            ? produto.preco_lojista
            : produto.preco_distribuidor;

        // Calcular total por produto
        const total_produto = new Decimal(preco_venda).mul(quantidade);

        // Somar aos totais do pedido
        preco_total = preco_total.add(total_produto);
        custo_total = custo_total.add(
          new Decimal(produto.custo).mul(quantidade),
        );
        quantidade_total_produtos += quantidade;

        // Retornar os dados processados
        return {
          produtoId,
          quantidade,
          preco_venda,
          total_produto,
        };
      }),
    );

    // Calcular lucro bruto e preço final
    const lucro_bruto = preco_total.sub(custo_total);
    const preco_final = preco_total.sub(new Decimal(desconto));

    // Criar o pedido no banco de dados
    const pedidoCriado = await this.prisma.pedido.create({
      data: {
        clienteId,
        tipo_cliente,
        preco_total,
        custo_total,
        lucro_bruto,
        desconto: new Decimal(desconto),
        motivo_desconto: motivo_desconto || '',
        preco_final,
        status_pedido,
        quantidade_total_produtos,
        produtos: {
          create: produtosProcessados.map((produto) => ({
            produtoId: produto.produtoId,
            quantidade: produto.quantidade,
            preco_venda: produto.preco_venda,
            total_produto: produto.total_produto,
          })),
        },
      },
      include: {
        produtos: {
          include: {
            Produto: {
              select: { codigo_produto: true, descricao_produto: true },
            },
          },
        },
      },
    });

    // Formatando a resposta
    const pedidoFormatado = {
      ...pedidoCriado,
      produtos: pedidoCriado.produtos.map((item) => ({
        id_pedido_produto: item.id_pedido_produto,
        pedidoId: item.pedidoId,
        produtoId: item.produtoId,
        quantidade: item.quantidade,
        preco_venda: item.preco_venda,
        total_produto: item.total_produto,
        codigo_produto: item.Produto.codigo_produto,
        descricao_produto: item.Produto.descricao_produto,
      })),
    };

    return pedidoFormatado;
  }

  async updateStatus(id: string, status: string) {
    // Atualiza o status da saída
    const saida = await this.prisma.pedido.update({
      where: { id_pedido: id },
      data: { status_pedido: status },
      include: {
        produtos: true, // Inclui os produtos vinculados à saída
      },
    });

    if (!saida) {
      throw new BadRequestException('Pedido não encontrada');
    }

    return saida;
  }
}
