import { Test, TestingModule } from '@nestjs/testing';
import { SaidaService } from './saida.service';

describe('SaidaService', () => {
  let service: SaidaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SaidaService],
    }).compile();

    service = module.get<SaidaService>(SaidaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
