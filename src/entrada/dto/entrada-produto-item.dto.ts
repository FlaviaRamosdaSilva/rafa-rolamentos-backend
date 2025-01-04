import { IsInt, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class EntradaProdutoItemDto {
  /**
   * Id do Produto
   * @example 123456789
   */
  @IsNotEmpty({ message: 'Produto ID é obrigatório' })
  @IsString()
  produtoId: string;

  /**
   * Quantidade do Produto, numero inteiro
   * @example 10
   */
  @IsNotEmpty({ message: 'Quantidade é obrigatória' })
  @IsInt({ message: 'Quantidade precisa ser um número inteiro' })
  quantidade: number;

  /**
   * Valor unitário do Produto, numero decimal
   * @example 15.99
   */
  @IsNotEmpty({ message: 'Valor unitário é obrigatório' })
  @IsNumber()
  custo: number;
}
