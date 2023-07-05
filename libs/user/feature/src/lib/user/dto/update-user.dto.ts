import { IsEmail, IsString } from "class-validator";

export class UpdateUserDto {

  @IsString()
  username: string;
}

