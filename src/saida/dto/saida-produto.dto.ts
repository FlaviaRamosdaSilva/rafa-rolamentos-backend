import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class PedidoProdutoDto {
  /**
   * ID do produto
   * @example 123456789
   */
  @IsNotEmpty({ message: 'Produto ID é obrigatório' })
  @IsString()
  produtoId: string;

  /**
   * Quantidade do produto, numero inteiro
   * @example 5
   */
  @IsNotEmpty({ message: 'Quantidade é obrigatória' })
  @IsInt({ message: 'Quantidade precisa ser um número inteiro' })
  quantidade: number;
}
