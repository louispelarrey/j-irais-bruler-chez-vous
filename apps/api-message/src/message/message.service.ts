import { Inject, Injectable } from '@nestjs/common';
import { MessageDto } from './dto/message.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from './message.entity';
import { Repository } from 'typeorm';
import { Room } from '../room/room.entity';
import { RoomService } from '../room/room.service';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class MessageService {

  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,

    @InjectRepository(Room)
    private readonly roomRepository: Repository<Room>,

    private readonly roomService: RoomService,
  ) {}

  /**
   * Creates a new message.
   * @param {MessageDto} messageDto - The message data.
   * @returns {Promise<Message>} A promise that resolves to the created message.
   */
  async create(messageDto: MessageDto) {
    const message = new Message();
    message.message = messageDto.message;
    message.senderId = messageDto.senderId;
    const room = await this.roomRepository.findOneBy({name: messageDto.roomName}) ??
      await this.roomService.create(messageDto.roomName);
    message.room = room;
    return this.messageRepository.save(message);
  }

  /**
   * Retrieves all messages.
   * @returns {Promise<Message[]>} A promise that resolves to an array of all messages.
   */
  findAll() {
    const messages = this.messageRepository.find();
    return messages;
  }

  /**
   * Retrieves all messages in a specific room.
   * @param {string} roomName - The name of the room.
   * @returns {Promise<Message[]>} A promise that resolves to an array of messages in the room.
   */
  async findAllByRoom(roomName: string) {
    const messages = this.messageRepository.find({
      where: {room: {name: roomName}},
      order: {createdAt: 'ASC'}
    });
    return messages;
  }

  /**
   * Retrieves a specific message by ID.
   * @param {string} id - The ID of the message.
   * @returns {Promise<Message>} A promise that resolves to the retrieved message.
   */
  findOne(id: string) {
    const message = this.messageRepository.findOneBy({id});
    return message;
  }

  /**
   * Updates a specific message.
   * @param {string} id - The ID of the message to update.
   * @param {MessageDto} messageDto - The updated message data.
   * @returns {Promise<Message>} A promise that resolves to the updated message.
   */
  async update(id: string, messageDto: MessageDto): Promise<Message> {
    const message = await this.messageRepository.findOne({ where: { id } });
    message.message = messageDto.message;
    return this.messageRepository.save(message);
  }

  /**
   * Removes a specific message.
   * @param {string} id - The ID of the message to remove.
   * @returns {Promise<Message>} A promise that resolves to the removed message.
   */
  async remove(id: string) {
    const message = await this.messageRepository.findOne({ where: { id } });
    return this.messageRepository.remove(message);
  }
}
