import { Module } from '@nestjs/common';
import { MessagingGateway } from './messaging.gateway';

@Module({
  imports: [],
  controllers: [],
  providers: [MessagingGateway],
})
export class MessagingModule {}
