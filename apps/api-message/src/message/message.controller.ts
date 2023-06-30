import { MessagePattern, Payload } from '@nestjs/microservices';
import { MessageService } from "./message.service";
import { Message } from "./message.entity";
import { Controller } from '@nestjs/common';
import { MessageDto } from './dto/message.dto';

@Controller()
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @MessagePattern('findAll')
  async findAll() {
    return this.messageService.findAll();
  }

  @MessagePattern('findAllByRoom')
  async findAllByRoom(@Payload() roomName: string): Promise<Message[]> {
    return this.messageService.findAllByRoom(roomName);
  }

  @MessagePattern('create')
  async create(@Payload() message: MessageDto): Promise<Message> {
    return this.messageService.create(message);
  }

  @MessagePattern('remove')
  async remove(@Payload() id: string): Promise<Message> {
    return this.messageService.remove(id);
  }

  @MessagePattern('update')
  async update(@Payload() {id, messageDto}: { id: string, messageDto: MessageDto}): Promise<Message> {
    console.log('message controller', messageDto);
    return this.messageService.update(id, messageDto);
  }
}
