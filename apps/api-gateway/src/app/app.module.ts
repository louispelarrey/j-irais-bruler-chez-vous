import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AuthenticationModule } from '../authentication/authentication.module';
import { UsersModule } from '../user/users.module';
import { JwtAuthGuard } from '@j-irais-bruler-chez-vous/authentication/feature';
import { RoleGuard } from '@j-irais-bruler-chez-vous/user/feature';

@Module({
  imports: [
    AuthenticationModule,
    UsersModule,
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
      }
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
