import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AuthenticationModule } from '../authentication/authentication.module';
import { UsersModule } from '../user/users.module';
import { JwtAuthGuard } from '../authentication/guards/jwt-auth.guard';
import { RoleGuard } from '../user/role/guard/role.guard';
import { MessageModule } from '../message/message/message.module';

@Module({
  imports: [
    AuthenticationModule,
    UsersModule,
    MessageModule,
    ClientsModule.register([
      {
        name: 'AUTHENTICATION',
        transport: Transport.TCP,
      },
      {
        name: 'USER',
        transport: Transport.TCP,
        options: {
          port: 3001,
        },
      },
      {
        name: 'MESSAGE',
        transport: Transport.TCP,
        options: {
          port: 3002,
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
