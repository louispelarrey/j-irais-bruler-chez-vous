import { Test, TestingModule } from '@nestjs/testing';
import { TrashsController } from './trashs.controller';

describe('TrashsController', () => {
  let controller: TrashsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TrashsController],
    }).compile();

    controller = module.get<TrashsController>(TrashsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
