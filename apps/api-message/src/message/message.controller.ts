import { MessagePattern, Payload } from '@nestjs/microservices';
import { MessageService } from "./message.service";
import { Message } from "./message.entity";
import { Controller } from '@nestjs/common';
import { MessageDto } from './dto/message.dto';

@Controller()
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  /**
   * Retrieves all messages.
   * @returns {Promise<Message[]>} A promise that resolves to an array of all messages.
   */
  @MessagePattern('findAll')
  async findAll() {
    return this.messageService.findAll();
  }

  /**
   * Retrieves all messages in a specific room.
   * @param {string} roomName - The name of the room.
   * @returns {Promise<Message[]>} A promise that resolves to an array of messages in the room.
   */
  @MessagePattern('findAllByRoom')
  async findAllByRoom(@Payload() roomName: string): Promise<Message[]> {
    return this.messageService.findAllByRoom(roomName);
  }

  /**
   * Creates a new message.
   * @param {MessageDto} message - The message data.
   * @returns {Promise<Message>} A promise that resolves to the created message.
   */
  @MessagePattern('create')
  async create(@Payload() message: MessageDto): Promise<Message> {
    return this.messageService.create(message);
  }

  /**
   * Removes a specific message.
   * @param {string} id - The ID of the message to remove.
   * @returns {Promise<Message>} A promise that resolves to the removed message.
   */
  @MessagePattern('remove')
  async remove(@Payload() id: string): Promise<Message> {
    return this.messageService.remove(id);
  }

  /**
   * Updates a specific message.
   * @param {string} id - The ID of the message to update.
   * @param {MessageDto} messageDto - The updated message data.
   * @returns {Promise<Message>} A promise that resolves to the updated message.
   */
  @MessagePattern('update')
  async update(@Payload() {id, messageDto}: { id: string, messageDto: MessageDto}): Promise<Message> {
    console.log('message controller', messageDto);
    return this.messageService.update(id, messageDto);
  }
}
