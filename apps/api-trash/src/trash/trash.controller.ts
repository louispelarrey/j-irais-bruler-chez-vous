import { Controller } from '@nestjs/common';
import { TrashService } from './trash.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('trash')
export class TrashController {
  constructor(private readonly trashService: TrashService) {}

  @MessagePattern('findAll')
  async findAll(@Payload() data: { test: string }) {
    return this.trashService.findAll(data);
  }
}
