import { Module } from '@nestjs/common';
import { TrashService } from './trash.service';
import { TrashController } from './trash.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Trash } from './trash.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Trash]),
  ],
  controllers: [TrashController],
  providers: [TrashService]
})
export class TrashModule {}
