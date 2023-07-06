import { Module } from '@nestjs/common';
import {ManifestationController} from "./manifestation.controller";
import {ManifestationService} from "./manifestation.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Manifestation} from "./manifestation.entity";
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    TypeOrmModule.forFeature([Manifestation]),
    ClientsModule.register([
      {
        name: 'USER',
        transport: Transport.TCP,
        options: {
          host: process.env.TCP_USER_HOST,
          port: 3001,
        },
      },
    ])
  ],
  controllers: [ManifestationController],
  providers: [ManifestationService]
})
export class ManifestationModule {}
