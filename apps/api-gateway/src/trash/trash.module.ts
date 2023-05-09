import { Module } from '@nestjs/common';
import { TrashService } from './trash.service';
import { TrashController } from './trash.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'TRASH',
        transport: Transport.TCP,
        options: {
          host: process.env.TCP_TRASH_HOST,
          port: 3003,
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
  controllers: [TrashController],
  providers: [TrashService]
})
export class TrashModule {}
