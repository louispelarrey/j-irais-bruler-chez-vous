import { Module } from '@nestjs/common';
import { ManifestationsController } from './manifestations.controller';
import { ManifestationsService } from './manifestations.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Manifestations } from './manifestations.entity';
import { Users } from '../../user-management/user/users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Manifestations, Users])],
  controllers: [ManifestationsController],
  providers: [ManifestationsService],
  exports: [ManifestationsService]
})
export class ManifestationsModule {}
