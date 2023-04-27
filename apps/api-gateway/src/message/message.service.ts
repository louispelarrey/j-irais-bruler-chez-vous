import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class MessageService {
  constructor(@Inject('MESSAGE') private readonly messageClient: ClientProxy) {}

  create(body: any) {
    return this.messageClient.send('message', body)
  }
}
