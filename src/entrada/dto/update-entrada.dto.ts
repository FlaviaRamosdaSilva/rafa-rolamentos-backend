import { PartialType } from '@nestjs/mapped-types';
import { IsOptional, IsString } from 'class-validator';
import { CreateEntradaDto } from './create-entrada.dto';

export class UpdateEntradaDto extends PartialType(CreateEntradaDto) {
  @IsOptional()
  @IsString()
  status_compra: string;
}
