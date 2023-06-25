import { Controller, Param } from '@nestjs/common';
import { TrashService } from './trash.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { TrashDto } from './dto/trash.dto';
import { Trash } from './trash.entity';

@Controller('trash')
export class TrashController {
  constructor(private readonly trashService: TrashService) {}

  @MessagePattern('findAll')
  async findAll() {
    return this.trashService.findAll();
  }

  @MessagePattern('findAllByUser')
  async findAllByUser(@Payload() posterId: string): Promise<Trash[]> {
    return this.trashService.findAllByUser(posterId);
  }

  @MessagePattern('findOne')
  async findOne(@Payload() id: string): Promise<Trash> {
    return await this.trashService.findOne(id);
  }

  @MessagePattern('create')
  async create(@Payload() createTrashDto: TrashDto): Promise<Trash> {
    return this.trashService.create(createTrashDto);
  }

  @MessagePattern('update')
  async update(@Payload() updateTrashDto: TrashDto ): Promise<Trash> {
    return this.trashService.update(updateTrashDto.id, updateTrashDto);
  }

  @MessagePattern('takeContract')
  async takeContract(@Payload() { id, burnerId }: { id: string, burnerId: string }): Promise<Trash> {
    return this.trashService.takeContract(id, burnerId);
  }

  @MessagePattern('remove')
  async remove(@Payload() { id, burnerId }: { id: string, burnerId: string }): Promise<Trash> {
    return this.trashService.remove(id, burnerId);
  }

  @MessagePattern('removeBurner')
  async removeBurner(@Payload() { id, burnerId }: { id: string, burnerId: string }): Promise<Trash> {
    return await this.trashService.removeBurner(id, burnerId);
  }
}
