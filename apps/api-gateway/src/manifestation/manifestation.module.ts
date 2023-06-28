import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import {ManifestationService} from "./manifestation.service";
import {ManifestationController} from "./manifestation.controller";

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'MANIFESTATION',
        transport: Transport.TCP,
        options: {
          host: process.env.TCP_MANIFESTATION_HOST,
          port: 3004,
        },
      },
      {
        name: 'USER',
        transport: Transport.TCP,
        options: {
          host: process.env.TCP_USER_HOST,
          port: 3001,
        },
      }
    ])
  ],
  controllers: [ManifestationController],
  providers: [ManifestationService]
})
export class ManifestationModule {}
