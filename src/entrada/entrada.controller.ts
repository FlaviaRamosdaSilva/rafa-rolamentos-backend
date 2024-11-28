import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EntradaService } from './entrada.service';
import { CreateEntradaDto } from './dto/create-entrada.dto';
import { UpdateEntradaDto } from './dto/update-entrada.dto';

@Controller('entrada')
export class EntradaController {
  constructor(private readonly entradaService: EntradaService) {}

  @Post()
  create(@Body() createEntradaDto: CreateEntradaDto) {
    return this.entradaService.create(createEntradaDto);
  }

  @Get()
  findAll() {
    return this.entradaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.entradaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEntradaDto: UpdateEntradaDto) {
    return this.entradaService.update(+id, updateEntradaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.entradaService.remove(+id);
  }
}
