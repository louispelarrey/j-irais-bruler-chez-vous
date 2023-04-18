import { Module } from '@nestjs/common';
import { TrashsController } from './trashs.controller';
import { TrashsService } from './trashs.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Trashs } from './trashs.entity';
import { Users } from '../../user-management/user/users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Trashs, Users])],
  controllers: [TrashsController],
  providers: [TrashsService],
  exports: [TrashsService]
})
export class TrashsModule {}
