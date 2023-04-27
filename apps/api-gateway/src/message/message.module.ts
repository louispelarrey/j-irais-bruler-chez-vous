import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageController } from './message.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'MESSAGE',
        transport: Transport.TCP,
        options: {
          port: 3002,
        },
      },
    ])
  ],
  controllers: [MessageController],
  providers: [MessageService]
})
export class MessageModule {}
