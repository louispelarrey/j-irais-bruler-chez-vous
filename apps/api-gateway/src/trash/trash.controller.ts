import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { TrashService } from './trash.service';
import { Public } from '../authentication/decorators/public.decorator';
import { CreateTrashDto } from './dto/create-trash.dto';
import { UpdateTrashDto } from './dto/update-trash.dto';

@Controller('trash')
export class TrashController {
  constructor(private readonly trashService: TrashService) {}

  @Get()
  @Public()
  findAll() {
    return this.trashService.findAll();
  }

  @Post()
  @Public()
  create(@Body() createTrashDto: CreateTrashDto) {
    return this.trashService.create(createTrashDto);
  }

  @Put()
  update(@Param('id') id: string, @Body() updateTrashDto: UpdateTrashDto) {
    return this.trashService.update(id, updateTrashDto);
  }
}
