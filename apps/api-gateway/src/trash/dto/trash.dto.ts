import { IsString, IsNotEmpty, ValidateNested, Length } from 'class-validator';

class Data {
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

export class TrashDto {
  @IsString()
  @IsNotEmpty()
  id?: string;

  @ValidateNested()
  data: Data;

  file: Express.Multer.File;
}