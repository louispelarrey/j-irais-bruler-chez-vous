import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer, ConnectedSocket, OnGatewayConnection } from '@nestjs/websockets';
import { MessageService } from './message.service';
import { Server, Socket } from 'socket.io';
import { MessageDto } from '@j-irais-bruler-chez-vous/message/feature';
import { lastValueFrom } from 'rxjs';

@WebSocketGateway(9001, { cors: '*:*' })
export class MessageGateway implements OnGatewayConnection {

  @WebSocketServer()
  server: Server;

  constructor(private readonly messageService: MessageService) {}

  async handleConnection(client: Socket, ..._args: any[]) {
    const roomName = client.handshake.query.roomName;
    if(!Array.isArray(roomName)) {
      client.join(roomName);
      this.server.to(roomName).emit('newMessage', await lastValueFrom(this.messageService.findAllByRoom(roomName)));

      client.on('disconnect', () => {
        client.leave(roomName);
      });
    }
  }

  @SubscribeMessage('leaveRoom')
  leaveRoom(@ConnectedSocket() client: Socket, @MessageBody() room: string) {
    client.leave(room);
  }

  @SubscribeMessage('createMessage')
  async create(@MessageBody() messageDto: MessageDto) {
    const message = await lastValueFrom(this.messageService.create(messageDto));
    this.server.to(messageDto.roomName).emit('newMessage', message);
  }

  @SubscribeMessage('findOneMessage')
  findOne(@MessageBody() id: string) {
    return this.messageService.findOne(id);
  }

  @SubscribeMessage('updateMessage')
  update(@MessageBody() messageDto: MessageDto) {
    return this.messageService.update(messageDto.id, messageDto);
  }

  @SubscribeMessage('removeMessage')
  remove(@MessageBody() id: string) {
    return this.messageService.remove(id);
  }
}
