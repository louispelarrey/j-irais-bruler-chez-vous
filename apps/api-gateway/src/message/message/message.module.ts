import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageGateway } from './message.gateway';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { UsersService } from '../../user/users.service';
import { UsersModule } from '../../user/users.module';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'MESSAGE',
        transport: Transport.TCP,
        options: {
          host: process.env.TCP_MESSAGE_HOST,
          port: 3002,
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
  providers: [MessageGateway, MessageService, UsersService],
  exports: [MessageService],
})
export class MessageModule {}
