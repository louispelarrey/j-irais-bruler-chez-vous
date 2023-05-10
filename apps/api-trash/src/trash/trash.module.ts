import { Module } from '@nestjs/common';
import { TrashService } from './trash.service';
import { TrashController } from './trash.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Trash } from './trash.entity';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    TypeOrmModule.forFeature([Trash]),
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
  controllers: [TrashController],
  providers: [TrashService]
})
export class TrashModule {}
