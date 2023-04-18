import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageGateway } from './message.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from './entities/message.entity';
import { Users } from '@user-management/user/users.entity';
import { Room } from '@messaging/room/entities/room.entity';
import { RoomService } from '@messaging/room/room.service';

@Module({
  imports: [TypeOrmModule.forFeature([Message, Users, Room])],
  providers: [MessageGateway, MessageService, RoomService],
  exports: [MessageService],
})
export class MessageModule {}
