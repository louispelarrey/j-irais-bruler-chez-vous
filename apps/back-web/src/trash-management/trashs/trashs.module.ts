import { Module } from '@nestjs/common';
import { TrashsController } from './trashs.controller';

@Module({
  controllers: [TrashsController]
})
export class TrashsModule {}
