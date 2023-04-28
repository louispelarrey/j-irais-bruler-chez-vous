import { MessagePattern, Payload } from '@nestjs/microservices';
import { MessageService } from "./message.service";
import { Message } from "./message.entity";
import { Controller } from '@nestjs/common';

@Controller()
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @MessagePattern('findAllByRoom')
  async findAllByRoom(@Payload() roomName: string): Promise<Message[]> {
    return this.messageService.findAllByRoom(roomName);
  }

}
