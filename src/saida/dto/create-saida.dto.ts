import { Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { PedidoProdutoDto } from './saida-produto.dto';

export class CreateSaidaDto {
  @IsNotEmpty({ message: 'Insira um código de cliente válido' })
  @IsString()
  clienteId: string;

  @IsNotEmpty({
    message: 'Insira o tipo de cliente, se lojista ou distribuidor',
  })
  @IsString()
  tipo_cliente: string;

  @IsOptional()
  @IsNumber()
  desconto: number;

  @IsOptional()
  @IsString()
  motivo_desconto: string;

  @IsOptional()
  @IsString()
  status_pedido: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PedidoProdutoDto)
  produtos: PedidoProdutoDto[];
}
