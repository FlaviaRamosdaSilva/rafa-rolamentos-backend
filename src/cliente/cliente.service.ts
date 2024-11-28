import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../config/prisma.service';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';

@Injectable()
export class ClienteService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createClienteDto: CreateClienteDto) {
    const { userId, nome, email, telefone } = createClienteDto;

    // Verifica se o userID existe
    const userExists = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!userExists) {
      throw new NotFoundException('Usuário não encontrado');
    }

    // Cria o cliente
    return this.prisma.cliente.create({
      data: {
        nome,
        email,
        telefone,
        userId: userId,
      },
    });
  }

  async findAll() {
    return await this.prisma.cliente.findMany();
  }

  async updateById(id: string, updateClienteDto: UpdateClienteDto) {
    // Verifica se o cliente existe
    const clienteExist = await this.prisma.cliente.findUnique({
      where: { id_cliente: id },
    });

    if (!clienteExist) {
      throw new NotFoundException('Cliente não encontrado.');
    }

    // Atualiza os dados do cliente
    return this.prisma.cliente.update({
      where: { id_cliente: id },
      data: {
        ...updateClienteDto, // Atualiza apenas os campos enviados no DTO
      },
    });
  }
}
