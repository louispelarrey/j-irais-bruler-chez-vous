import { Controller, Param } from '@nestjs/common';
import { TrashService } from './trash.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateTrashDto } from './dto/create-trash.dto';
import { Trash } from './trash.entity';
import { UpdateTrashDto } from './dto/update-trash.dto';

@Controller('trash')
export class TrashController {
  constructor(private readonly trashService: TrashService) {}

  @MessagePattern('findAll')
  async findAll(@Payload() data: { test: string }) {
    return this.trashService.findAll(data);
  }

  @MessagePattern('create')
  async create(@Payload() createTrashDto: CreateTrashDto): Promise<Trash> {
    return this.trashService.create(createTrashDto);
  }

  @MessagePattern('update')
  async update(@Param('id') id: string, @Payload() updateTrashDto: UpdateTrashDto): Promise<Trash> {
    return this.trashService.update(id, updateTrashDto);
  }
}
