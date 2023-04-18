import { Injectable } from '@nestjs/common';
import { MessageDto } from './dto/message.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from './entities/message.entity';
import { Repository } from 'typeorm';
import { Users } from '@user-management/user/users.entity';
import { Room } from '@messaging/room/entities/room.entity';
import { RoomService } from '@messaging/room/room.service';

@Injectable()
export class MessageService {

  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,

    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,

    @InjectRepository(Room)
    private readonly roomRepository: Repository<Room>,

    private readonly roomService: RoomService,
  ) {}

  async create(messageDto: MessageDto) {
    const message = new Message();
    message.message = messageDto.message;
    message.sender = await this.userRepository.findOneBy({id: messageDto.senderId});
    //find room by name
    console.log(await this.roomRepository.findOneBy({name: messageDto.roomName}))
    const room = await this.roomRepository.findOneBy({name: messageDto.roomName}) ??
      await this.roomService.create(messageDto.roomName);
    message.room = room;
    return this.messageRepository.save(message);
  }

  findAllByRoom(roomName: string) {
    //Find all messages by room name and order by createdAt and with sender
    const messages = this.messageRepository.find({
      where: {room: {name: roomName}},
      order: {createdAt: 'ASC'},
      relations: ['sender'],
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
    message.sender = await this.userRepository.findOneBy({id: messageDto.senderId});
    return this.messageRepository.save(message);
  }

  async remove(id: string) {
    const message = await this.findOne(id);
    return this.messageRepository.remove(message);
  }
}
