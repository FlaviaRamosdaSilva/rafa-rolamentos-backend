import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SaidaService } from './saida.service';
import { CreateSaidaDto } from './dto/create-saida.dto';
import { UpdateSaidaDto } from './dto/update-saida.dto';

@Controller('saida')
export class SaidaController {
  constructor(private readonly saidaService: SaidaService) {}

  @Post()
  create(@Body() createSaidaDto: CreateSaidaDto) {
    return this.saidaService.create(createSaidaDto);
  }

  @Get()
  findAll() {
    return this.saidaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.saidaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSaidaDto: UpdateSaidaDto) {
    return this.saidaService.update(+id, updateSaidaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.saidaService.remove(+id);
  }
}
