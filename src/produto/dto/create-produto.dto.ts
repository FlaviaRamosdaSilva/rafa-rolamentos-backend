import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateProdutoDto {
  @IsNotEmpty({ message: 'Insira um código para este produto' })
  @IsString()
  codigo_produto: string;

  @IsNotEmpty({ message: 'Descrição do produto é obrigatório' })
  @IsString()
  @MinLength(10, { message: 'A descrição deve ter no mínimo 10 caracteres' })
  descricao_produto: string;

  @IsNotEmpty({ message: 'Custo do item é obrigatório' })
  @IsNumber()
  custo: number;

  @IsNotEmpty({ message: 'Preço distribuidor é obrigatório' })
  @IsNumber()
  preco_distribuidor: number;

  @IsNotEmpty({ message: 'Preço de Lojista é obrigatório' })
  @IsNumber()
  preco_lojista: number;

  @IsNotEmpty({ message: 'Quantidade total é obrigatório' })
  @IsInt({ message: 'Quantidade_total precisa ser um número inteiro' })
  quantidade_total: number;

  @IsNotEmpty({ message: 'Quantidade mínima é obrigatório' })
  @IsInt({ message: 'Quantidade_minima precisa ser um número inteiro' })
  quantidade_minima: number;

  @IsString()
  @IsNotEmpty({ message: 'ID do usuário é obrigatório' })
  userId: string;
}
