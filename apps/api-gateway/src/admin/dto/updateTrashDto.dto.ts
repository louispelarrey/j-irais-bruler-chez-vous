import { IsString, IsNotEmpty, Length } from 'class-validator';

export class UpdateTrashDto {
    id?: string;

    @IsString()
    @IsNotEmpty()
    reference: string;

    @IsString()
    @IsNotEmpty()
    @Length(10, 400)
    description: string;

    @IsString()
    @IsNotEmpty()
    address: string;

    @IsString()
    @IsNotEmpty()
    posterId: string;

    burners?: string[];
}