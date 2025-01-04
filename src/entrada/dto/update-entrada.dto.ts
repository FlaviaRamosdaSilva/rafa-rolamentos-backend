import { PartialType } from '@nestjs/mapped-types';
import { IsOptional, IsString } from 'class-validator';
import { CreateEntradaDto } from './create-entrada.dto';

export class UpdateEntradaDto extends PartialType(CreateEntradaDto) {
  /**
 * Estatus da compra
 * @examples: [
      'pedido efetuada',
      'pagamento efetuado, aguardando',
      'em transporte',
      'aguardando conferência',
      'pedido finalizado',
      'pedido aguardando complemento',
    ]
*/
  @IsOptional()
  @IsString()
  status_compra: string;
}
