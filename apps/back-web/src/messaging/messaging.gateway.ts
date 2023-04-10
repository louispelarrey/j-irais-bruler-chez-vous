import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

interface Message {
  userId: string;
  message: string;
}

@WebSocketGateway(3001, { cors: '*:*' })
export class MessagingGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('sendMessage')
  handleMessage(@MessageBody() {message, userId}): void {
    console.log('message: ', message, 'userId: ', userId)
    this.server.emit('newMessage', {
      userId: userId,
      username: 'test',
      message: message,
    });

    /**
     * Fake send message from another user as a response
     */
    setTimeout(() => {
      this.server.emit('newMessage', {
        userId: '5f9b9a4e4c1d3e1c8c7f6f4b',
        message: 'Hello from the other side',
      });
    }
    , 2000);

  }
}
