import { IsString, IsNotEmpty, Length } from 'class-validator';

export class UpdateTrashDto {
  id?: string;

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
