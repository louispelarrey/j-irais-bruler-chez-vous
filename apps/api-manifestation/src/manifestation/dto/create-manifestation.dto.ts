import {IsDate, IsString} from "class-validator";

export class CreateManifestationDto {
    @IsString()
    title: string;

    @IsString()
    description: string;

    @IsDate()
    date_debut: string;
}
