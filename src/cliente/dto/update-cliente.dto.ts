import { IsEmail, IsMobilePhone, IsOptional, IsString } from 'class-validator';

export class UpdateClienteDto {
  @IsEmail(
    { allow_display_name: false, require_tld: true },
    { message: 'E-mail inválido' },
  )
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  nome?: string;

  @IsMobilePhone('pt-BR', {}, { message: 'Número de telefone inválido' })
  @IsOptional()
  telefone?: string;
}
