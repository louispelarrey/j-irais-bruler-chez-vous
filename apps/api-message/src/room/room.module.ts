import { Module } from '@nestjs/common';
import { RoomService } from './room.service';
import { RoomGateway } from './room.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Room } from './room.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Room])],
  providers: [RoomGateway, RoomService],
  exports: [RoomService],
})
export class RoomModule {}
