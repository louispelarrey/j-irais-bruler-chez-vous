import {IsDate, IsString} from "class-validator";

export class CreateManifestationDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsDate()
  start_date: string;

  @IsString()
  address: string;

  @IsString()
  creatorId?: string | undefined;
}
