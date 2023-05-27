import { MessageDto } from '@j-irais-bruler-chez-vous/message/feature';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class MessageService {
  constructor(
    @Inject('MESSAGE') private readonly messageClient: ClientProxy,
    @Inject('USER') private readonly userClient: ClientProxy,
  ){}

  async findAllByRoom(roomName: string) {
    const messages = await lastValueFrom(this.messageClient.send('findAllByRoom', roomName));
    const updatedMessages = await Promise.all(
      messages.map(async message => {
        message.sender = await lastValueFrom(this.userClient.send('findUserById', message.senderId));
        return message;
      }),
    );

    return updatedMessages;
  }

  async create(messageDto: MessageDto) {
    const message = await lastValueFrom(this.messageClient.send('create', messageDto));
    message.sender = await lastValueFrom(this.userClient.send('findUserById', message.senderId));
    return message;
  }

  findOne(id: string) {
    return this.messageClient.send('findOne', id);
  }

  update(id: string, messageDto: MessageDto) {
    return this.messageClient.send('update', { id, messageDto });
  }

  remove(id: string) {
    return lastValueFrom(this.messageClient.send('remove', id));
  }

  checkAppropriate(text: string): Promise<boolean> {
    return lastValueFrom(this.messageClient.send('check-moderation', text));
  }
}
