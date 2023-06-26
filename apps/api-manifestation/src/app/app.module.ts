import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {ManifestationModule} from "../manifestation/manifestation.module";
import { ParticipantModule } from '../participant/participant.module';
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule, ManifestationModule, ParticipantModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: parseInt(configService.get('DB_PORT')),
        username: configService.get('DB_USER'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),
    ConfigModule.forRoot(),
  ],
})
export class AppModule {}
