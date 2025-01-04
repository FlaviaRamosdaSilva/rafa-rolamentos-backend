import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateProdutoDto {
  /**
   * Código do produto
   * @example 798855 ou Rol85236
   */
  @IsNotEmpty({ message: 'Insira um código para este produto' })
  @IsString()
  codigo_produto: string;

  /**
   * Descrição do produto, deve conter no mínimo 10 caracteres
   * @example Rolamento de roda para titan, fan ou start
   */
  @IsNotEmpty({ message: 'Descrição do produto é obrigatório' })
  @IsString()
  @MinLength(10, { message: 'A descrição deve ter no mínimo 10 caracteres' })
  descricao_produto: string;

  /**
   * Nome do fabricante, marca do rolamento
   * @example Nachi
   */
  @IsNotEmpty({ message: 'insira um fabricante para este produto' })
  @IsString()
  fabricante: string;

  /**
   * Custo do rolamento, quanto eu paguei por ele
   * @example 13.99
   */
  @IsNotEmpty({ message: 'Custo do item é obrigatório' })
  @IsNumber()
  custo: number;

  /**
   * Preço do rolamento quando eu vender para um distribuidor
   * @example 12.99
   */
  @IsNotEmpty({ message: 'Preço distribuidor é obrigatório' })
  @IsNumber()
  preco_distribuidor: number;

  /**
   * Preço do rolamento quando eu vender para um lojista
   * @example 15.99
   */
  @IsNotEmpty({ message: 'Preço de Lojista é obrigatório' })
  @IsNumber()
  preco_lojista: number;

  /**
   * Quantidade total de rolamento
   * @example 32
   */
  @IsNotEmpty({ message: 'Quantidade total é obrigatório' })
  @IsInt({ message: 'Quantidade_total precisa ser um número inteiro' })
  quantidade_total: number;

  /**
   * Quantidade mínima de rolamento, meu estoque de segurança
   * @example 10
   */
  @IsNotEmpty({ message: 'Quantidade mínima é obrigatório' })
  @IsInt({ message: 'Quantidade_minima precisa ser um número inteiro' })
  quantidade_minima: number;

  /**
   * ID do usuário (Rafa Rolamentos)
   * @example 1234567890
   */
  @IsString()
  @IsNotEmpty({ message: 'ID do usuário é obrigatório' })
  userId: string;
}
