import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { Users, ForgotPassword } from '@j-irais-bruler-chez-vous/user/feature'
import { UsersService } from '@j-irais-bruler-chez-vous/user/feature'
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [TypeOrmModule.forFeature([Users, ForgotPassword]),
    ClientsModule.register([
      {
        name: 'MAILING_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: 'mailing_queue',
          queueOptions: {
            durable:  true
          },
        },
      },
    ])
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService]
})
export class UsersModule {}
