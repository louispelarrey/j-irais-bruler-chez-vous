import { IsString, IsNotEmpty } from 'class-validator';

export class MessageDto {
  @IsString()
  @IsNotEmpty()
  id?: string;
  message: string;
  senderId: string;
  roomName: string;
}
