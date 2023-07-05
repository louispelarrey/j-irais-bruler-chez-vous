import { IsString } from 'class-validator';

export class UpdateManifestationDto {
  
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  address: string;

  @IsString()
  start_date: string;
}
