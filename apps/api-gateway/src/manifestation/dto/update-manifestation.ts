import { IsString, IsNotEmpty, Length } from 'class-validator';

export class UpdateManifestationDto {

  @IsString()
  @IsNotEmpty()
  @Length(3, 50)
  title: string;

  @IsString()
  @IsNotEmpty()
  @Length(10, 400)
  description: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsString()
  @IsNotEmpty()
  start_date: string;
}
