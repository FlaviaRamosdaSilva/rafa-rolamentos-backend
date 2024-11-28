import { Injectable } from '@nestjs/common';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';

@Injectable()
export class ClienteService {
  create(createClienteDto: CreateClienteDto) {
    return 'This action adds a new clinte';
  }

  findAll() {
    return `This action returns all clinte`;
  }

  findOne(id: number) {
    return `This action returns a #${id} clinte`;
  }

  update(id: number, updateClienteDto: UpdateClienteDto) {
    return `This action updates a #${id} clinte`;
  }

  remove(id: number) {
    return `This action removes a #${id} clinte`;
  }
}
