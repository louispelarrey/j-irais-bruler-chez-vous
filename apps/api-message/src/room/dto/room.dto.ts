import { IsString, IsNotEmpty, Length } from 'class-validator';

export class RoomDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  @Length(3, 50)
  name: string;
}

