import { Injectable } from '@nestjs/common';
import { Storage } from '@google-cloud/storage';
import { createReadStream } from 'fs';

@Injectable()
export class FileUploadService {
  private storage: Storage;
  private bucketName = 'jbcv-trash-images';

  constructor() {
    /**
     * Creates an instance of the FileUploadService.
     * It initializes the Google Cloud Storage client with the provided project ID and key filename.
     */
    this.storage = new Storage({
      projectId: 'j-irais-bruler-chez-vous',
      keyFilename: './file-upload-key.json',
    });
  }

  /**
   * Uploads a file to Google Cloud Storage.
   * @param {Express.Multer.File} file - The file to upload.
   * @returns {Promise<string>} A promise that resolves to the public URL of the uploaded file.
   */
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
