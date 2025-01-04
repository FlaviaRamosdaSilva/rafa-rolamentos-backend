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
  /**
   * ID do cliente
   * @example 123456789
   */
  @IsNotEmpty({ message: 'Insira um código de cliente válido' })
  @IsString()
  clienteId: string;

  /**
   * Informar o tiupo de cliente, se lojista ou distribuidor
   * @example Lojista ou Distribuidor
   */
  @IsNotEmpty({
    message: 'Insira o tipo de cliente, se lojista ou distribuidor',
  })
  @IsString()
  tipo_cliente: string;

  /**
   * Inserir um valor de desconto, se necessário
   * @example 5.90
   */
  @IsOptional()
  @IsNumber()
  desconto?: number;

  /**
   * Descreva o motivo do desconto dado ao cliente
   * @example Desconto devido pagamento em dinheiro
   */
  @IsOptional()
  @IsString()
  motivo_desconto?: string;

  /**
   * Status do pedido
   * @examples ['Pendente',
      'Aprovado',
      'Pedido em separação',
      'Entregue, Aguardando Pagamento',
      'Pedido Finalizado e Pago',
      'Cancelado',]
   */
  @IsOptional()
  @IsString()
  status_pedido?: string;

  /**
   * Lista de produtos do pedido
   * @example [{ produtoId: '123456789', quantidade: 2 }, { produtoId: '987654321', quantidade: 1 }]
   * @type PedidoProdutoDto
   */
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PedidoProdutoDto)
  produtos: PedidoProdutoDto[];
}
