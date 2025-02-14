import { Injectable, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../config/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createUserDto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(createUserDto.senha, 6);
    return await this.prisma.user.create({
      data: {
        ...createUserDto,
        senha: hashedPassword,
      },
    });
  }

  async findOne(email: string) {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async findAll() {
    return await this.prisma.user.findMany();
  }

  async updatePassword(
    recoverToken: string,
    updatePasswordDto: UpdatePasswordDto,
  ) {
    // Encontre o usuário pelo recoverToken
    const user = await this.prisma.user.findFirst({
      where: { recoverToken },
    });

    if (!user) {
      throw new NotFoundException('Token de recuperação inválido.');
    }

    // Hash da nova senha com BCRYPT
    const hashedPassword = await bcrypt.hash(updatePasswordDto.newPassword, 6);

    // Atualize o usuário com a nova senha e remova o recoverToken
    return this.prisma.user.update({
      where: { id: user.id },
      data: {
        senha: hashedPassword,
        recoverToken: null, // Limpa o token de recuperação após o uso
      },
    });
  }
}
