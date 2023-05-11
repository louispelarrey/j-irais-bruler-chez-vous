import {IsDate, IsString} from "class-validator";

export class CreateManifestationDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsDate()
  start_date: string;

  @IsDate()
  ville: string;

  @IsString()
  creatorId?: string | undefined;
}
