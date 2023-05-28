import { Body, Controller, Get, Param, Patch, Post, Put, Request } from '@nestjs/common';
import { TrashService } from './trash.service';
import { Public } from '../authentication/decorators/public.decorator';
import { TrashDto } from './dto/trash.dto';

@Controller('trash')
export class TrashController {
  constructor(private readonly trashService: TrashService) {}

  @Get()
  @Public()
  findAll() {
    return this.trashService.findAll();
  }

  @Get(':id')
  @Public()
  findOne(@Param('id') id: string) {
    return this.trashService.findOne(id);
  }

  @Get('myTrash/:posterId')
  @Public()
  findAllByUser(@Param('posterId') posterId: string) {
    return this.trashService.findAllByUser(posterId);
  }

  @Post()
  create(@Request() req: any, @Body() createTrashDto: TrashDto) {
    return this.trashService.create(req.user.sub, createTrashDto);
  }

  @Put(':id')
  @Public()
  update(@Param('id') id: string, @Body() updateTrashDto: TrashDto) {
    return this.trashService.update(id, updateTrashDto);
  }

  @Patch(':id')
  takeTrash(@Request() req: any, @Param('id') id: string) {
    return this.trashService.takeTrash(id, req.user.sub);
  }
}
