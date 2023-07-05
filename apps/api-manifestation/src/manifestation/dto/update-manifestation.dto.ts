import {IsDate, IsString, IsNotEmpty} from 'class-validator';

export class UpdateManifestationDto {

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  address: string;

  @IsDate()
  @IsNotEmpty()
  start_date: string;
}
