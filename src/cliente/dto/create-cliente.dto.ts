import { IsEmail, IsMobilePhone, IsNotEmpty, IsString } from 'class-validator';

export class CreateClienteDto {
  /**
   * Nome do cliente
   * @example José da Silva
   */
  @IsString()
  @IsNotEmpty({ message: 'Nome não pode ser vazio' })
  nome: string;

  /**
   * E-mail do cliente
   * @example cliente@exemplo.com
   */
  @IsEmail(
    { allow_display_name: false, require_tld: true },
    { message: 'E-mail inválido' },
  )
  @IsNotEmpty({ message: 'E-mail é obrigatório' })
  email: string;

  /**
   * Telefone do cliente
   * @example 1199999999
   */
  @IsMobilePhone(
    'pt-BR',
    {},
    { message: 'Número de telefone inválido. Use o formato brasileiro' },
  )
  @IsNotEmpty({ message: 'Telefone é obrigatório' })
  telefone: string;

  /**
   * ID do usuário do sistema (Rafa Rolamentos)
   * @example 1234567890
   */
  @IsString()
  @IsNotEmpty({ message: 'ID do usuário é obrigatório' })
  userId: string;
}
