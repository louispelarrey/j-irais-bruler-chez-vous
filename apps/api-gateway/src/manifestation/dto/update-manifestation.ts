import { IsString, IsNotEmpty } from 'class-validator';

export class UpdateManifestationDto {

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  address: string;

  @IsString()
  @IsNotEmpty()
  start_date: string;
}
