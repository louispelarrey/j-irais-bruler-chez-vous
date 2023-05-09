import { Module } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { AuthenticationController } from './authentication.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'AUTHENTICATION',
        transport: Transport.TCP,
        options: {
          host: process.env.TCP_AUTHENTICATION_HOST,
          port: 3000,
        }
      },
    ])
  ],
  controllers: [AuthenticationController],
  providers: [AuthenticationService]
})
export class AuthenticationModule {}
