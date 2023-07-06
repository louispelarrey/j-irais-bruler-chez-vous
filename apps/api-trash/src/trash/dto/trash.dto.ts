import { Express } from 'express';
import { Multer } from 'multer';
import { IsString, IsNotEmpty, ValidateNested, Length } from 'class-validator';

class Data {
  @IsString()
  @IsNotEmpty()
  reference: string;

  @IsString()
  @IsNotEmpty()
  @Length(3, 400)
  description: string;

  @IsString()
  address: string;

  @IsString()
  @IsNotEmpty()
  posterId: string;

  burners?: string[];
}

export class TrashDto {
  id?: string;

  @ValidateNested()
  data: Data;

  @IsNotEmpty()
  file: Express.Multer.File;
}

