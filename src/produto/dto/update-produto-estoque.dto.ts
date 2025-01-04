import { IsInt, IsNotEmpty } from 'class-validator';

export class UpdateProdutoEstoqueDto {
  /**
   * Quantidade total de rolamento
   * @example 32
   */
  @IsNotEmpty({ message: 'Quantidade total é obrigatório' })
  @IsInt({ message: 'Quantidade_total precisa ser um número inteiro' })
  quantidade_total: number;

  /**
   * Quantidade mínima de rolamento
   * @example 16
   */
  @IsInt({ message: 'Quantidade_minima precisa ser um número inteiro' })
  quantidade_minima: number;
}
