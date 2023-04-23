import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AuthenticationModule } from '../authentication/authentication.module';
import { UserModule } from '../user/user.module';
import { JwtAuthGuard } from '@j-irais-bruler-chez-vous/authentication/feature';
import { RoleGuard } from '@j-irais-bruler-chez-vous/user/feature';

@Module({
  imports: [
    AuthenticationModule,
    UserModule,
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
