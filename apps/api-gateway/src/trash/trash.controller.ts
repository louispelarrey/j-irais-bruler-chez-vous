import { Controller, Get } from '@nestjs/common';
import { TrashService } from './trash.service';
import { Public } from '../authentication/decorators/public.decorator';

@Controller('trash')
export class TrashController {
  constructor(private readonly trashService: TrashService) {}

  @Get()
  @Public()
  findAll() {
    return this.trashService.findAll();
  }
}
