import { Injectable } from '@nestjs/common';
import { Storage } from '@google-cloud/storage';
import { createReadStream } from 'fs';

@Injectable()
export class FileUploadService {
  private storage: Storage;
  private bucketName = 'jbcv-trash-images';

  constructor() {
    this.storage = new Storage({
      projectId: 'j-irais-bruler-chez-vous',
      keyFilename: './file-upload-key.json',
    });
  }

  async uploadFile(file: Express.Multer.File): Promise<string> {
    const bucket = this.storage.bucket(this.bucketName);
    const blob = bucket.file(file.originalname);
    const blobStream = blob.createWriteStream();

    blobStream.on('error', err => {
      console.log(err);
    });

    blobStream.end(Buffer.from(file.buffer));

    return `https://storage.googleapis.com/${this.bucketName}/${blob.name}`;
  }
}
