import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../config/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}
  create(createUserDto: CreateUserDto) {
    return this.prisma.user.create({
      data: {
        ...createUserDto,
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
    // const hashedPassword = await bcrypt.hash(updatePasswordDto.newPassword, 10);

    // Atualize o usuário com a nova senha e remova o recoverToken
    return this.prisma.user.update({
      where: { id: user.id },
      data: {
        senha: updatePasswordDto.newPassword,
        recoverToken: null, // Limpa o token de recuperação após o uso
      },
    });
  }
}
