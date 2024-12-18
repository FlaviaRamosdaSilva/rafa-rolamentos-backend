import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import Decimal from 'decimal.js';
import { PrismaService } from '../config/prisma.service';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';

@Injectable()
export class ProdutoService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createProdutoDto: CreateProdutoDto) {
    const {
      userId,
      codigo_produto,
      descricao_produto,
      fabricante,
      custo,
      preco_distribuidor,
      preco_lojista,
      quantidade_total,
      quantidade_minima,
    } = createProdutoDto;

    // Verifica se o userID existe
    const userExists = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!userExists) {
      throw new NotFoundException('Usuário não encontrado');
    }

    // Verifica se já existe um produto com o mesmo código
    const codigoExist = await this.prisma.produto.findFirst({
      where: { codigo_produto },
    });

    if (codigoExist) {
      throw new BadRequestException('Já existe um produto com esse código');
    }

    // Cria o Produto
    return this.prisma.produto.create({
      data: {
        codigo_produto,
        descricao_produto,
        fabricante,
        custo,
        preco_distribuidor,
        preco_lojista,
        quantidade_total,
        quantidade_minima,
        userId: userId,
      },
    });
  }
  //Refatoração da lógica de procurar se o ID do produto existe
  private async findProdutoById(id: string) {
    const produto = await this.prisma.produto.findUnique({
      where: { id_produto: id },
    });

    if (!produto) {
      throw new NotFoundException('Produto não encontrado');
    }

    return produto;
  }

  //localizar os produtos (GET)
  async findAll() {
    return await this.prisma.produto.findMany();
  }

  //Alteração dos produtos
  async update(id: string, updateProdutoDto: UpdateProdutoDto) {
    // Verifica se o produto existe
    await this.findProdutoById(id);

    // Atualiza os dados do produto
    return this.prisma.produto.update({
      where: { id_produto: id },
      data: updateProdutoDto,
    });
  }

  //deletar produtos
  async delete(id: string) {
    const produtoExist = await this.findProdutoById(id);

    // Deleta o produto
    await this.prisma.produto.delete({
      where: { id_produto: id },
    });

    // Retorna a mensagem de sucesso após deleção
    return {
      message: `Produto ${produtoExist.descricao_produto} deletado com sucesso`,
    };
  }

  //lógica para alteração de estoque com entrada de mercadoria
  async updateEstoque(id: string, quantidade: number, custo: number) {
    const produtoExist = await this.findProdutoById(id);
    const novoEstoque = produtoExist.quantidade_total + quantidade;

    //transformo o custo que veio em number, para Decimal
    const custoDecimal = new Decimal(custo);

    // Verifica e atualiza o custo somente se o novo custo for maior que o existente
    const custoAlterado = custoDecimal.gt(produtoExist.custo);
    const novoCusto = custoAlterado ? custoDecimal : produtoExist.custo;

    //atualiza os precos de distribuidor e de lojista com base no novo custo
    const novoPrecoDistribuidor = custoAlterado
      ? novoCusto.mul(1.25)
      : produtoExist.preco_distribuidor;

    const novoPrecoLojista = custoAlterado
      ? novoCusto.mul(1.4)
      : produtoExist.preco_lojista;

    // Atualiza o estoque do produto com os novos dados
    await this.prisma.produto.update({
      where: { id_produto: id },
      data: {
        quantidade_total: novoEstoque,
        custo: novoCusto,
        preco_distribuidor: novoPrecoDistribuidor,
        preco_lojista: novoPrecoLojista,
      },
    });
    // Retorna a mensagem de sucesso após alteração de estoque
    return {
      message: `Estoque do produto ${produtoExist.descricao_produto} alterado com sucesso`,
    };
  }

  async exitEstoque(id: string, quantidade: number) {
    const produtoExist = await this.findProdutoById(id);

    if (produtoExist.quantidade_total >= quantidade) {
      const novoEstoque = produtoExist.quantidade_total - quantidade;

      // Executa as operações dentro de uma transação
      await this.prisma.$transaction(async (prisma) => {
        // Atualiza o estoque do produto com os novos dados
        await this.prisma.produto.update({
          where: { id_produto: id },
          data: {
            quantidade_total: novoEstoque,
          },
        });

        // Adiciona log de saída
        await this.prisma.estoqueLog.create({
          data: {
            produtoId: id,
            quantidade,
            tipo: 'SAIDA',
            descricao: 'Baixa no estoque por pedido aprovado',
          },
        });
      });

      return {
        message: `Estoque do produto ${produtoExist.descricao_produto} alterado com sucesso`,
      };
    } else {
      throw new BadRequestException('Quantidade de estoque insuficiente');
    }
  }
}
