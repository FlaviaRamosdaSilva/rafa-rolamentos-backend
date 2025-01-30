import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { ProdutoService } from '../produto/produto.service';
import { CreateSaidaDto } from './dto/create-saida.dto';
import { UpdateSaidaDto } from './dto/update-saida.dto';
import { SaidaService } from './saida.service';

@Controller('saida')
export class SaidaController {
  constructor(
    private readonly saidaService: SaidaService,
    private readonly produtoService: ProdutoService,
  ) {}

  @Post()
  create(@Body() createSaidaDto: CreateSaidaDto) {
    return this.saidaService.create(createSaidaDto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() UpdateSaidaDto: UpdateSaidaDto) {
    return this.saidaService.updatePedido(id, UpdateSaidaDto);
  }
  @Patch(':id')
  async updateStatus(
    @Param('id') id: string,
    @Body('status_pedido') status: string,
  ) {
    // Valida o status recebido
    const validStatuses = [
      'Pendente',
      'Aprovado',
      'Pedido em separação',
      'Entregue, Aguardando Pagamento',
      'Pedido Finalizado e Pago',
      'Cancelado',
    ];
    if (!validStatuses.includes(status)) {
      throw new BadRequestException(
        `Status inválido. Valores permitidos: ${validStatuses.join(', ')}`,
      );
    }
    // Atualiza o status no banco de dados
    const saida = await this.saidaService.updateStatus(id, status);

    // Se o status for "Aprovado", realiza a baixa no estoque
    if (status === 'Aprovado') {
      for (const item of saida.produtos) {
        await this.produtoService.exitEstoque(item.produtoId, item.quantidade);
      } // Se o status for "Cancelado", realiza o retorno ao estoque
    } else if (status === 'Cancelado') {
      for (const item of saida.produtos) {
        await this.produtoService.returnEstoque(
          item.produtoId,
          item.quantidade,
        );
      }
    }
    return {
      message: `Status da saída ${id} atualizado para ${status} com sucesso.`,
      saida,
    };
  }

  @Get()
  findAll() {
    return this.saidaService.findAll();
  }

  @Get(':id')
  findPedidoById(@Param('id') id: string) {
    return this.saidaService.findPedidoById(id);
  }

  @Get('historico')
  async getHistoricoPedidos() {
    return this.saidaService.getPedidosLog();
  }

  @Get(':id/historico')
  async getHistoricoPedido(@Param('id') id: string) {
    return this.saidaService.getPedidoLog(id);
  }
}
