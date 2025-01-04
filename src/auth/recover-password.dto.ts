import { IsEmail } from 'class-validator';

export class RecoverPasswordDto {
  /**
   * Email do usuário
   * @example usuario@email.com
   */
  @IsEmail()
  email: string;
}
