import { IsString, IsNotEmpty, ValidateNested, Length } from 'class-validator';
import { Express } from 'express';

class Data {
    @IsString()
    @IsNotEmpty()
    reference: string;

    @IsString()
    @IsNotEmpty()
    @Length(5, 400)
    description: string;

    @IsString()
    @IsNotEmpty()
    address: string;

    @IsString()
    @IsNotEmpty()
    posterId: string;

    burners?: string[];
}

export class TrashDto {
    @IsString()
    id?: string;

    @ValidateNested()
    data: Data;

    file: Express.Multer.File;
}