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

  // Generate unique filename using a combination of date and original name
  const uniqueFilename = `${Date.now()}-${file.originalname}`;
  const blob = bucket.file(uniqueFilename);

  return new Promise((resolve, reject) => {
    const blobStream = blob.createWriteStream({
      metadata: {
        contentType: file.mimetype,
      },
    });

    blobStream.on('error', (err) => {
      console.error('Error in blobStream:', err);
      reject(err);
    });

    blobStream.on('finish', () => {
      const publicUrl = `https://storage.googleapis.com/${this.bucketName}/${blob.name}`;
      resolve(publicUrl);
    });

    // Convert file.buffer.data to a Buffer before ending the stream
    blobStream.end(Buffer.from(file.buffer));
  });
}


}
