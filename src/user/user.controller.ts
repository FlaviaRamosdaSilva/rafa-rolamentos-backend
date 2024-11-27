import { Body, Controller, Param, Patch, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  // rota para alterar a senha que veio com o token:
  @Patch('reset-password/:recoverToken')
  async resetPassword(
    @Param('recoverToken') recoverToken: string,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ) {
    return await this.userService.updatePassword(
      recoverToken,
      updatePasswordDto,
    );
  }
}
