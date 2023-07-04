export class TrashDto {
  id?: string;
  data : {
    reference: string;
    description: string;
    posterId: string;
    burners?: string[];
    latitude: number;
    longitude: number;
    address: string;
  }
  file: Express.Multer.File;
}
