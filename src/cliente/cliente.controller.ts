import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ClienteService } from './cliente.service';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';

@Controller('cliente')
export class ClienteController {
  constructor(private readonly clienteService: ClienteService) {}

  @Post()
  create(@Body() createClienteDto: CreateClienteDto) {
    return this.clienteService.create(createClienteDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    console.log('ID recebido:', id);
    return this.clienteService.findOne(id);
  }

  @Get()
  findAll() {
    return this.clienteService.findAll();
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateClienteDto: UpdateClienteDto) {
    return this.clienteService.updateById(id, updateClienteDto);
  }
}
