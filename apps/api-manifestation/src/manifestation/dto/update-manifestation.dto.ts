import {IsString} from 'class-validator';

export class UpdateManifestationDto {

  @IsString()
  title: string;

  @IsString()
  description: string;

  is_active: boolean;
}
