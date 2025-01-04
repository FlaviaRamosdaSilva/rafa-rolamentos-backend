import { IsString, MinLength } from 'class-validator';

export class UpdatePasswordDto {
  /**
   * Insira uma nova senha do usuário
   * @example 123456
   */
  @IsString()
  @MinLength(6, { message: 'A senha deve ter pelo menos 6 caracteres.' })
  newPassword: string;
}
