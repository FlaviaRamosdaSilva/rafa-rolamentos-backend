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
  @IsString()
  @IsNotEmpty({ message: 'Fornecedor não pode ser vazio' })
  fornecedor: string;

  @IsOptional()
  @IsNumber()
  valor_total_compra: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => EntradaProdutoItemDto)
  itens: EntradaProdutoItemDto[];
}
