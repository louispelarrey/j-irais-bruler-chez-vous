import { IsString } from "class-validator";

export class CreateTrashDto {
    @IsString()
    reference: string;

    @IsString()
    description: string;
}