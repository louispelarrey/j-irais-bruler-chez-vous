import { Module } from '@nestjs/common';
import { TrashsController } from './trashs.controller';
import { TrashsService } from './trashs.service';

@Module({
  controllers: [TrashsController],
  providers: [TrashsService]
})
export class TrashsModule {}
