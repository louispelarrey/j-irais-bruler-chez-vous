import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { Users, ForgotPassword } from '@j-irais-bruler-chez-vous/user/feature'
import { UsersService } from '@j-irais-bruler-chez-vous/user/feature'
import { ClientsModule, Transport } from '@nestjs/microservices';
import { UserTrash } from 'libs/user/feature/src/lib/user-trash/user-trash.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Users, ForgotPassword, UserTrash]),
    ClientsModule.register([
      {
        name: 'MAILING_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBITMQ_URL],
          queue: 'mailing_queue',
          queueOptions: {
            durable:  true
          },
        },
      },
      {
        name: 'TRASH',
        transport: Transport.TCP,
        options: {
          host: process.env.TCP_TRASH_HOST,
          port: 3003,
        }
      },
      {
        name: 'MANNIFESTATION',
        transport: Transport.TCP,
        options: {
          host: process.env.TCP_MANIFESTATION_HOST,
          port: 3004,
        }
      },
    ])
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService]
})
export class UsersModule {}
