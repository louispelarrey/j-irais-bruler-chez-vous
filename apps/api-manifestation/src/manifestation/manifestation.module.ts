import { Module } from '@nestjs/common';
import {ManifestationController} from "./manifestation.controller";
import {ManifestationService} from "./manifestation.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Manifestation} from "./manifestation.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([Manifestation]),
  ],
  controllers: [ManifestationController],
  providers: [ManifestationService]
})
export class ManifestationModule {}
