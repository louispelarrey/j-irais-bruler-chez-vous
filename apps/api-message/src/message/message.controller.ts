import { MessagePattern, Payload } from '@nestjs/microservices';
import { MessageService } from "./message.service";
import { Message } from "./message.entity";
import { Controller } from '@nestjs/common';
import { MessageDto } from './dto/message.dto';

@Controller()
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @MessagePattern('findAllByRoom')
  async findAllByRoom(@Payload() roomName: string): Promise<Message[]> {
    return this.messageService.findAllByRoom(roomName);
  }

  @MessagePattern('create')
  async create(@Payload() message: MessageDto): Promise<Message> {
    return this.messageService.create(message);
  }

}
