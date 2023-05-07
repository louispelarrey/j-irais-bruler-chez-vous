import { Body, Controller, Get, Post } from '@nestjs/common';
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

  @Post('/create')
  create(@Body() body: any) {
    return this.trashService.create(body);
  }

  @Post('/update')
  update(@Body() body: any) {
    return this.trashService.update(body.id, body);
  }
}
