import { IsString } from 'class-validator';

export class UpdateTrashDto {
    @IsString()
    name: string;

    @IsString()
    description: string;

    @IsString()
    status: string;
}