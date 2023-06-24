import { Express } from 'express';
import { Multer } from 'multer';

export class TrashDto {
  id?: string;
  data: {
    reference: string;
    description: string;
    address: string;
    posterId: string;
    burners?: string[];
  };
  file: Express.Multer.File;
}
