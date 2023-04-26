import { IsString } from 'class-validator';

export class UpdateManifestationDto {
    @IsString()
    name: string;

    @IsString()
    description: string;

    @IsString()
    status: string;
}
