import { PartialType } from '@nestjs/mapped-types';
import { CreateSaidaDto } from './create-saida.dto';

export class UpdateSaidaDto extends PartialType(CreateSaidaDto) {}
