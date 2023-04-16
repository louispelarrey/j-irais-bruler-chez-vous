import { Module } from '@nestjs/common';
import { MessageModule } from './message/message.module';
import { RoomModule } from './room/room.module';
import { MessageGateway } from './message/message.gateway';
import { RoomGateway } from './room/room.gateway';

@Module({
  imports: [MessageModule, RoomModule],
  controllers: [MessageGateway, RoomGateway],
  providers: [],
})
export class MessagingModule {}
