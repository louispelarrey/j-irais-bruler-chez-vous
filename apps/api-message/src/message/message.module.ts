import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageController } from './message.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from './message.entity';
import { Room } from '../room/room.entity';
import { RoomService } from '@api-message/room/room.service';

@Module({
  imports: [TypeOrmModule.forFeature([Message, Room])],
  controllers: [MessageController],
  providers: [MessageService, RoomService],
  exports: [MessageService],
})
export class MessageModule {}
