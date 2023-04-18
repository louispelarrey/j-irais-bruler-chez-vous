import { Test, TestingModule } from '@nestjs/testing';
import { TrashsService } from './trashs.service';

describe('TrashsService', () => {
  let service: TrashsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TrashsService],
    }).compile();

    service = module.get<TrashsService>(TrashsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
