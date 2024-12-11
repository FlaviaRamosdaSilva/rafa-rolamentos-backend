import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ProdutoService } from '../produto/produto.service';
import { CreateEntradaDto } from './dto/create-entrada.dto';
import { UpdateEntradaDto } from './dto/update-entrada.dto';
import { EntradaService } from './entrada.service';

@Controller('entrada')
export class EntradaController {
  constructor(
    private readonly entradaService: EntradaService,
    private readonly produtoService: ProdutoService,
  ) {}

  @Post()
  async create(@Body() createEntradaDto: CreateEntradaDto) {
    //Grava no banco de dados a compra/entrada:
    const compraCriada = await this.entradaService.create(createEntradaDto);
    // Aqui atualiza o estoque dos produtos que estão a compra/entrada
    for (const item of createEntradaDto.itens) {
      await this.produtoService.updateEstoque(item.produtoId, item.quantidade);
    }

    return {
      message: 'Entrada registrada e estoque atualizado com sucesso!',
      compra: compraCriada,
    };
  }

  @Get()
  async findAll() {
    return await this.entradaService.findAll();
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() UpdateEntradaDto: UpdateEntradaDto) {
    return this.entradaService.updateById(id, UpdateEntradaDto);
  }
}
