import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  /**
   * E-mail do usuário
   * @example usuario@exemplo.com
   */
  @IsEmail()
  @IsNotEmpty()
  email: string;

  /**
   * Senha do usuário
   * @example 123456
   */
  @IsString()
  @IsNotEmpty()
  senha: string;

  /**
   * Tipo da chave Pix
   * @example CPF ou telefone
   */
  @IsString()
  @IsNotEmpty()
  tipo_chave_pix: string;

  /**
   * Chave Pix para pagamentos
   * @example 123.456.789-00 ou 519999999999
   */
  @IsString()
  @IsNotEmpty()
  chave_pix: string;
}
