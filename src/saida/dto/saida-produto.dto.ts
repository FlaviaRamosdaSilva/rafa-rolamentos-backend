import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class PedidoProdutoDto {
  @IsNotEmpty({ message: 'Produto ID é obrigatório' })
  @IsString()
  produtoId: string;

  @IsNotEmpty({ message: 'Quantidade é obrigatória' })
  @IsInt({ message: 'Quantidade precisa ser um número inteiro' })
  quantidade: number;
}
