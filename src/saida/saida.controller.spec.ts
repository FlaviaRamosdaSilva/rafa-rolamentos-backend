import { Test, TestingModule } from '@nestjs/testing';
import { SaidaController } from './saida.controller';
import { SaidaService } from './saida.service';

describe('SaidaController', () => {
  let controller: SaidaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SaidaController],
      providers: [SaidaService],
    }).compile();

    controller = module.get<SaidaController>(SaidaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
