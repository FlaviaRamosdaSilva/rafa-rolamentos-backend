import { PartialType } from '@nestjs/mapped-types';
import { CreateEntradaDto } from './create-entrada.dto';

export class UpdateEntradaDto extends PartialType(CreateEntradaDto) {}
