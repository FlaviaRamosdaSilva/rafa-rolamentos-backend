import {
  BadRequestException,
  Body,
  Controller,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ProdutoService } from '../produto/produto.service';
import { CreateSaidaDto } from './dto/create-saida.dto';
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
  @Put(':id/status')
  async updateStatus(@Param('id') id: string, @Body('status') status: string) {
    // Valida o status recebido
    const validStatuses = ['Pendente', 'Aprovado', 'Cancelado'];
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
      }
    }

    return {
      message: `Status da saída ${id} atualizado para ${status} com sucesso.`,
      saida,
    };
  }
}
