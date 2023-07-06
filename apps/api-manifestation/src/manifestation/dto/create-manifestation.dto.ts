import {IsDate, IsString, IsNotEmpty, Length} from "class-validator";

export class CreateManifestationDto {
  @IsString()
  @IsNotEmpty()
  @Length(3, 50)
  title: string;

  @IsString()
  @IsNotEmpty()
  @Length(10, 400)
  description: string;

  @IsNotEmpty()
  @IsString()
  start_date: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  creatorId?: string | undefined;
}