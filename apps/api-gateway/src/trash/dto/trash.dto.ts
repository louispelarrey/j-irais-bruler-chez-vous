import { IsString, IsNotEmpty, ValidateNested } from 'class-validator';

class Data {
  @IsString()
  @IsNotEmpty()
  reference: string;

  @IsString()
  @IsNotEmpty()
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
