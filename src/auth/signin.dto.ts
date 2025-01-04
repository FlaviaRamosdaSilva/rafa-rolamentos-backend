import { IsEmail, IsNotEmpty } from 'class-validator';

export class signInDto {
  /**
   * E-mail do usuário
   * @example usuario@exemplo.com
   */
  @IsEmail()
  email: string;

  /**
   * Senha do usuário
   * @example 123456
   */
  @IsNotEmpty()
  senha: string;
}
