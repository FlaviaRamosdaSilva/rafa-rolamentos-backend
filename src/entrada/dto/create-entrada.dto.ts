import { Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { EntradaProdutoItemDto } from './entrada-produto-item.dto';

export class CreateEntradaDto {
  /**
   * Nome do fornecedor
   * @example Fornecedor da Silva
   */
  @IsString()
  @IsNotEmpty({ message: 'Fornecedor não pode ser vazio' })
  fornecedor: string;

  /**
   * Valor total da compra
   * @example: 100.00
   */
  @IsOptional()
  @IsNumber()
  valor_total_compra: number;

  /**
   * Itens da compra
   * @type: EntradaProdutoItemDto
   */
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => EntradaProdutoItemDto)
  itens: EntradaProdutoItemDto[];
}
