import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoEstoqueDto } from './dto/update-produto-estoque.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';
import { ProdutoService } from './produto.service';

@Controller('produto')
export class ProdutoController {
  constructor(private readonly produtoService: ProdutoService) {}

  @Post()
  create(@Body() createProdutoDto: CreateProdutoDto) {
    return this.produtoService.create(createProdutoDto);
  }

  @Get()
  findAll() {
    return this.produtoService.findAll();
  }

  @Get(':id')
  findProdutoById(@Param('id') id: string) {
    return this.produtoService.findProdutoById(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateProdutoDto: UpdateProdutoDto) {
    return this.produtoService.update(id, updateProdutoDto);
  }

  @Put('/estoque/:id')
  updateStock(
    @Param('id') id: string,
    @Body() updateProdutoEstoqueDto: UpdateProdutoEstoqueDto,
  ) {
    const { quantidade_total, quantidade_minima } = updateProdutoEstoqueDto;
    return this.produtoService.updateStock(
      id,
      quantidade_total,
      quantidade_minima,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.produtoService.delete(id);
  }

  @Get(':id/historico')
  async getHistoricoEstoque(@Param('id') id: string) {
    return this.produtoService.getEstoqueLog(id);
  }
}
