import { Module } from '@nestjs/common';
import { PrismaService } from '../config/prisma.service';
import { ClienteController } from './cliente.controller';
import { ClienteService } from './cliente.service';

@Module({
  controllers: [ClienteController],
  providers: [ClienteService, PrismaService],
})
export class ClienteModule {}
