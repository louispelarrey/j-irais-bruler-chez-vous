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

  async create(messageDto: MessageDto) {
    const message = new Message();
    message.message = messageDto.message;
    message.senderId = messageDto.senderId;
    const room = await this.roomRepository.findOneBy({name: messageDto.roomName}) ??
      await this.roomService.create(messageDto.roomName);
    message.room = room;
    return this.messageRepository.save(message);
  }

  findAll() {
    const messages = this.messageRepository.find();
    return messages;
  }
  
  async findAllByRoom(roomName: string) {
    //Find all messages by room name and order by createdAt and with sender
    const messages = this.messageRepository.find({
      where: {room: {name: roomName}},
      order: {createdAt: 'ASC'}
    });
    return messages;
  }

  findOne(id: string) {
    const message = this.messageRepository.findOneBy({id});
    return message;
  }

  async update(id: string, messageDto: MessageDto) {
    const message = await this.findOne(id);
    message.message = messageDto.message;
    message.senderId = messageDto.senderId;
    return this.messageRepository.save(message);
  }

  async remove(id: string) {
    const message = await this.findOne(id);
    return this.messageRepository.remove(message);
  }
}
