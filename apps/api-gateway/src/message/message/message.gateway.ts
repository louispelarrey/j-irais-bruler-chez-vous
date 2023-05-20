import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer, ConnectedSocket, OnGatewayConnection } from '@nestjs/websockets';
import { MessageService } from './message.service';
import { Server, Socket } from 'socket.io';
import { MessageDto } from '@j-irais-bruler-chez-vous/message/feature';
import { UsersService } from '../../user/users.service';
import { lastValueFrom } from 'rxjs';

@WebSocketGateway({ cors: { origin: [process.env.FRONTEND_URL, 'capacitor://localhost'] } })
export class MessageGateway implements OnGatewayConnection {

  @WebSocketServer()
  server: Server;

  constructor(
    private readonly messageService: MessageService,
  ) {}

  async handleConnection(client: Socket, ..._args: any[]) {

    const roomName = client.handshake.query.roomName;
    if(!Array.isArray(roomName)) {

      client.join(roomName);
      const messages = await this.messageService.findAllByRoom(roomName).catch((err) => console.log(err));
      this.server.to(roomName).emit('newMessage', messages);

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
    const message = await this.messageService.create(messageDto);
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
