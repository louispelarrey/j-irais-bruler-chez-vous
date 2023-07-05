import { IsString, IsNotEmpty, ValidateNested } from 'class-validator';

class Data {
  @IsString()
  reference: string;

  @IsString()
  description: string;
}

export class UpdateTrashDto {
  @IsString()
  id?: string;

  @ValidateNested()
  data: Data;
}
