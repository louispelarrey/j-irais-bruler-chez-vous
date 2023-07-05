import { IsString } from 'class-validator';


//mettre les bonnes validations sur chaque champs
export class TrashDto {
  @IsString()
  id?: string;
  data : {
    reference: string;
    description: string;
    address: string;
    posterId: string;
    burners?: string[];
  }

  file: Express.Multer.File;
}
