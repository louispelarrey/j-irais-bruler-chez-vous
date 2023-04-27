import { MessageDto } from '@j-irais-bruler-chez-vous/message/feature';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class MessageService {

  constructor(
    @Inject('MESSAGE') private readonly messageClient: ClientProxy,
  ){}

  findAllByRoom(roomName: string) {
    return this.messageClient.send('findAllByRoom', roomName);
  }

  create(messageDto: MessageDto) {
    return this.messageClient.send('create', messageDto);
  }

  findOne(id: string) {
    return this.messageClient.send('findOne', id);
  }

  update(id: string, messageDto: MessageDto) {
    return this.messageClient.send('update', { id, messageDto });
  }

  remove(id: string) {
    return this.messageClient.send('remove', id);
  }
}
