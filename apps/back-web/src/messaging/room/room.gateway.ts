import { WebSocketGateway, SubscribeMessage, MessageBody } from '@nestjs/websockets';
import { RoomService } from './room.service';
import { RoomDto } from './dto/room.dto';


@WebSocketGateway()
export class RoomGateway {
  constructor(private readonly roomService: RoomService) {}

  @SubscribeMessage('createRoom')
  create(@MessageBody() roomDto: RoomDto) {
    return this.roomService.create(roomDto.name);
  }

  @SubscribeMessage('findAllRoom')
  findAll() {
    return this.roomService.findAll();
  }

  @SubscribeMessage('findOneRoom')
  findOne(@MessageBody() id: string) {
    return this.roomService.findOne(id);
  }

  @SubscribeMessage('updateRoom')
  update(@MessageBody() roomDto: RoomDto) {
    return this.roomService.update(roomDto.id, roomDto);
  }

  @SubscribeMessage('removeRoom')
  remove(@MessageBody() id: string) {
    return this.roomService.remove(id);
  }
}
