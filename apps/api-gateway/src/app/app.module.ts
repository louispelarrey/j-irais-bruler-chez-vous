import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AuthenticationModule } from '../authentication/authentication.module';
import { UsersModule } from '../user/users.module';
import { JwtAuthGuard } from '../authentication/guards/jwt-auth.guard';
import { RoleGuard } from '../user/role/guard/role.guard';
import { MessageModule } from '../message/message/message.module';
import { TrashModule } from '../trash/trash.module';
import {ManifestationModule} from "../manifestation/manifestation.module";

@Module({
  imports: [
    AuthenticationModule,
    UsersModule,
    MessageModule,
    TrashModule,
    ManifestationModule,
    ClientsModule.register([
      {
        name: 'AUTHENTICATION',
        transport: Transport.TCP,
        options: {
          host: process.env.TCP_AUTHENTICATION_HOST,
          port: 3000,
        }
      },
      {
        name: 'USER',
        transport: Transport.TCP,
        options: {
          host: process.env.TCP_USER_HOST,
          port: 3001,
        },
      },
      {
        name: 'MESSAGE',
        transport: Transport.TCP,
        options: {
          host: process.env.TCP_MESSAGE_HOST,
          port: 3002,
        },
      },
      {
        name: 'TRASH',
        transport: Transport.TCP,
        options: {
          host: process.env.TCP_TRASH_HOST,
          port: 3003,
        },
      },
      {
        name: 'MANIFESTATION',
        transport: Transport.TCP,
        options: {
          host: process.env.TCP_MANIFESTATION_HOST,
          port: 3004,
        },
      },
    ])
  ],
  providers: [
    {
      provide: 'APP_INTERCEPTOR',
      useClass: ClassSerializerInterceptor,
    },
    {
      provide: 'APP_GUARD',
      useClass: JwtAuthGuard,
    },
    {
      provide: 'APP_GUARD',
      useClass: RoleGuard,
    },
  ],
})
export class AppModule {}
