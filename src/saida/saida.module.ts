import { Module } from '@nestjs/common';
import { SaidaService } from './saida.service';
import { SaidaController } from './saida.controller';

@Module({
  controllers: [SaidaController],
  providers: [SaidaService],
})
export class SaidaModule {}
