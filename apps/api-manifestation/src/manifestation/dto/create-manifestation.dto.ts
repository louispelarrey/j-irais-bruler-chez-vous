import {IsDate, IsString, IsNotEmpty} from "class-validator";

export class CreateManifestationDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsDate()
  @IsNotEmpty()
  start_date: string;

  @IsString()
  address: string;

  @IsString()
  @IsNotEmpty()
  creatorId?: string | undefined;
}
