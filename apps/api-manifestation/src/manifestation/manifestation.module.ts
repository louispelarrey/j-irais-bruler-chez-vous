import { Module } from '@nestjs/common';
import {ManifestationController} from "./manifestation.controller";
import {ManifestationService} from "./manifestation.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Manifestation} from "./manifestation.entity";
import { Participant } from '../participant/participant.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Manifestation, Participant]),
  ],
  controllers: [ManifestationController],
  providers: [ManifestationService]
})
export class ManifestationModule {}
