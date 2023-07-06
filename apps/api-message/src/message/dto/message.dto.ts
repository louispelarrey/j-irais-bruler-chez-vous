import { IsString, IsNotEmpty, Length } from 'class-validator';

export class MessageDto {
  @IsString()
  @IsNotEmpty()
  id?: string;

  @IsString()
  @IsNotEmpty()
  message: string;

  @IsString()
  @IsNotEmpty()
  senderId: string;

  @IsString()
  @IsNotEmpty()
  @Length(3, 50)
  roomName: string;
}

