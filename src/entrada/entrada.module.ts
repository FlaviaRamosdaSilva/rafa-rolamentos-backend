import { Module } from '@nestjs/common';
import { EntradaService } from './entrada.service';
import { EntradaController } from './entrada.controller';

@Module({
  controllers: [EntradaController],
  providers: [EntradaService],
})
export class EntradaModule {}
