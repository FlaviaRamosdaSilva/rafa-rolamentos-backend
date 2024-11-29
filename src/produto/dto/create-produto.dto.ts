import {
  IsDecimal,
  IsInt,
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';
import Decimal from 'decimal.js';

export class CreateProdutoDto {
  @IsNotEmpty({ message: 'Insira um código para este produto' })
  @IsString()
  codigo_produto: string;

  @IsNotEmpty({ message: 'Descrição do produto é obrigatório' })
  @IsString()
  @MinLength(10, { message: 'A descrição deve ter no mínimo 10 caracteres' })
  descricao_produto: string;

  @IsNotEmpty({ message: 'Custo do item é obrigatório' })
  @IsDecimal()
  @Matches(/^\d+(\.\d{1,2})?$/, {
    message: 'O custo deve ter no máximo 2 casas decimais',
  })
  custo: Decimal;

  @IsNotEmpty({ message: 'Preço Nachi é obrigatório' })
  @IsDecimal()
  @Matches(/^\d+(\.\d{1,2})?$/, {
    message: 'O custo deve ter no máximo 2 casas decimais',
  })
  preco_nachi: Decimal;

  @IsNotEmpty({ message: 'Preço distribuidor é obrigatório' })
  @IsDecimal()
  @Matches(/^\d+(\.\d{1,2})?$/, {
    message: 'O custo deve ter no máximo 2 casas decimais',
  })
  preco_distribuidor: Decimal;

  @IsNotEmpty({ message: 'Preço de Lojista é obrigatório' })
  @IsDecimal()
  @Matches(/^\d+(\.\d{1,2})?$/, {
    message: 'O custo deve ter no máximo 2 casas decimais',
  })
  preco_lojista: Decimal;

  @IsNotEmpty({ message: 'Quantidade total é obrigatório' })
  @IsInt({ message: 'Precisa ser um número inteiro' })
  quantidade_total: number;

  @IsNotEmpty({ message: 'Quantidade mínima é obrigatório' })
  @IsInt({ message: 'Precisa ser um número inteiro' })
  quantidade_minima: number;

  @IsString()
  @IsNotEmpty({ message: 'ID do usuário é obrigatório' })
  userId: string;
}
