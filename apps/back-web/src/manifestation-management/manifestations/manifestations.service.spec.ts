import { Test, TestingModule } from '@nestjs/testing';
import { ManifestationsService } from './manifestations.service';

describe('ManifestationsService', () => {
  let service: ManifestationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ManifestationsService],
    }).compile();

    service = module.get<ManifestationsService>(ManifestationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
