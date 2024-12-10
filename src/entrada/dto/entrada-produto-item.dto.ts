import { IsInt, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class EntradaProdutoItemDto {
  @IsString()
  @IsNotEmpty({ message: 'ID da compra é obrigatório' })
  comprasId: string;

  @IsNotEmpty({ message: 'Produto ID é obrigatório' })
  @IsString()
  produtoId: string;

  @IsNotEmpty({ message: 'Quantidade é obrigatória' })
  @IsInt({ message: 'Quantidade precisa ser um número inteiro' })
  quantidade: number;

  @IsNotEmpty({ message: 'Valor unitário é obrigatório' })
  @IsNumber()
  custo: number;
}
