import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer, ConnectedSocket } from '@nestjs/websockets';
import { MessageService } from './message.service';
import { MessageDto } from './dto/message.dto';
import { Server, Socket } from 'socket.io';

@WebSocketGateway(3001, { cors: '*:*' })
export class MessageGateway {

  @WebSocketServer()
  server: Server;

  constructor(private readonly messageService: MessageService) {}

  @SubscribeMessage('joinRoom')
  joinRoom(@ConnectedSocket() client: Socket, @MessageBody() room: string) {
    client.join(room);
  }

  @SubscribeMessage('leaveRoom')
  leaveRoom(@ConnectedSocket() client: Socket, @MessageBody() room: string) {
    client.leave(room);
  }

  @SubscribeMessage('createMessage')
  create(@MessageBody() messageDto: MessageDto) {
    this.messageService.create(messageDto);
    this.server.to(messageDto.roomName).emit('newMessage', messageDto);
  }

  @SubscribeMessage('findAllMessageByRoom')
  async findAll(@MessageBody() roomName: string) {
    this.server.to(roomName).emit('newMessage', await this.messageService.findAllByRoom(roomName));
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
