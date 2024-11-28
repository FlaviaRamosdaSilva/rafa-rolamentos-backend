import { IsEmail, IsMobilePhone, IsNotEmpty, IsString } from 'class-validator';

export class CreateClienteDto {
  @IsString()
  @IsNotEmpty({ message: 'Nome não pode ser vazio' })
  nome: string;

  @IsEmail(
    { allow_display_name: false, require_tld: true },
    { message: 'E-mail inválido' },
  )
  @IsNotEmpty({ message: 'E-mail é obrigatório' })
  email: string;

  @IsMobilePhone(
    'pt-BR',
    {},
    { message: 'Número de telefone inválido. Use o formato brasileiro' },
  )
  @IsNotEmpty({ message: 'Telefone é obrigatório' })
  telefone: string;

  @IsString()
  @IsNotEmpty({ message: 'ID do usuário é obrigatório' })
  userId: string;
}
