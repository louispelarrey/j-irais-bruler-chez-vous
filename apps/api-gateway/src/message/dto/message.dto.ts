import { IsString } from 'class-validator';

export class MessageDto {
  @IsString()
  id?: string;
  message: string;
  senderId: string;
  roomName: string;
}
