import {IsDate, IsString} from 'class-validator';

export class UpdateManifestationDto {

  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  address: string;

  @IsDate()
  start_date: string;
}
