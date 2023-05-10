import { Module } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { AuthenticationController } from './authentication.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt.strategy'; // adjust the path according to your project structure
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
  imports: [
    ConfigModule, // import ConfigModule here
    ClientsModule.register([
      {
        name: 'AUTHENTICATION',
        transport: Transport.TCP,
        options: {
          host: process.env.TCP_AUTHENTICATION_HOST,
          port: 3000,
        },
      },
    ]),
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule], // also add ConfigModule here
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('jwt.secret'),
        signOptions: { expiresIn: '3600s' },
      }),
    }),
  ],
  controllers: [AuthenticationController],
  providers: [AuthenticationService, LocalStrategy, JwtStrategy],
})
export class AuthenticationModule {}
