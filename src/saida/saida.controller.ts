import { Body, Controller, Post } from '@nestjs/common';
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
}
