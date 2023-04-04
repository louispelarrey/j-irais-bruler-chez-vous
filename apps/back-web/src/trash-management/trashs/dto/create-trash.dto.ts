import { IsString } from "class-validator";

export class CreateTrashDto {
    @IsString()
    name: string;

    @IsString()
    description: string;

    @IsString()
    status: string;
}