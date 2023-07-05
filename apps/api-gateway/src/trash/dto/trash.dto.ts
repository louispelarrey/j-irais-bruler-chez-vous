import { IsString } from 'class-validator';


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
  //Faire un une fonction de validation custom pour fichier
  file: Express.Multer.File;
}
