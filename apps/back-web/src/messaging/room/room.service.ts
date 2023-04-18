import { Injectable } from '@nestjs/common';
import { RoomDto } from './dto/room.dto';
import { Room } from './entities/room.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class RoomService {

  constructor(
    @InjectRepository(Room)
    private readonly roomRepository: Repository<Room>,
  ) {}

  create(roomName: string) {
    const room = new Room();
    room.name = roomName;
    return this.roomRepository.save(room);
  }

  findAll() {
    return `This action returns all room`;
  }

  findOne(id: string) {
    return `This action returns a #${id} room`;
  }

  update(id: string, roomDto: RoomDto) {
    return `This action updates a #${id} room`;
  }

  remove(id: string) {
    return `This action removes a #${id} room`;
  }
}
