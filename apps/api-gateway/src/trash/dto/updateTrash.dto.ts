import { IsString } from 'class-validator';

export class UpdateTrashDto {
  @IsString()
    id?: string;
    data : {
      reference: string;
      description: string;
    }
  }