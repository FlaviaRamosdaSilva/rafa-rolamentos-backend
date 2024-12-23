import { IsInt, IsNotEmpty } from 'class-validator';

export class UpdateProdutoEstoqueDto {
  @IsNotEmpty({ message: 'Quantidade total é obrigatório' })
  @IsInt({ message: 'Quantidade_total precisa ser um número inteiro' })
  quantidade_total: number;

  @IsInt({ message: 'Quantidade_minima precisa ser um número inteiro' })
  quantidade_minima: number;
}
