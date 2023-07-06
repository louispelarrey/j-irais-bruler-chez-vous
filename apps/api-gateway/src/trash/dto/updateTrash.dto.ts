import { IsString, ValidateNested, Length } from 'class-validator';

class Data {
  @IsString()
  reference: string;

  @IsString()
  @Length(10, 400)
  description: string;
}

export class UpdateTrashDto {
  @IsString()
  id?: string;

  @ValidateNested()
  data: Data;
}