import { Injectable } from '@nestjs/common';
import { CreateSaidaDto } from './dto/create-saida.dto';
import { UpdateSaidaDto } from './dto/update-saida.dto';

@Injectable()
export class SaidaService {
  create(createSaidaDto: CreateSaidaDto) {
    return 'This action adds a new saida';
  }

  findAll() {
    return `This action returns all saida`;
  }

  findOne(id: number) {
    return `This action returns a #${id} saida`;
  }

  update(id: number, updateSaidaDto: UpdateSaidaDto) {
    return `This action updates a #${id} saida`;
  }

  remove(id: number) {
    return `This action removes a #${id} saida`;
  }
}
