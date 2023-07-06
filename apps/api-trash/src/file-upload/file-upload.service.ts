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
      credentials: {
        private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCdDVx21er2e0kD\nI7i8Qf9LfxVFC2F320XtFPJHgEGrj2LlgG5WhXaO3Wp2jrlWr853IRjnsQe0DOGO\n/VS+eCY3+JUuvKYpCn+JeTD2g7vwCpjP5Khh+REUtcgaGly5mYlmCzrO65LTnPrg\nKHBCfm1hIpAODwjgDbFSKx5jbeFuLGkbljgZpM0tqa+Xduz2mkLDeMWYG6pZhA4D\n7W/GG5AGWzySzwaN8TTr41597CcGQDfEskl2hsH4u1z3Vt8TarhMTDm5ZeopR+Tn\njqXpiYoLDFWK/fRWQlNrGBjMtInsFoHQvfG8vB2PE2DKrBRQQwRqu7wLE4VT/xhh\nyOi9GKiLAgMBAAECggEAFZLQyUgwWwRrbqF5Dm84bPv7hXz/OhImZF9UuqqtGq57\nJNCEF6GEvDJBHiET54sF3wpuW+FPEBYW4+f7vKBPi6+7emySnJ+jDlTV+370EZC7\nFg+wa6jlhkVERAWsCBjFrX1MakEk7amqMqGLbi7kwouXYz8Adpqa6ZEfvwPIjDQZ\nLQ9anPlxn4/mR018WjfQHKjqHTIBrcxg1djzHgoqMb4boLPeQHj6Y4kb2dr9IvsB\n4XmM+WPumCrvnYmu3ApR9aiwGDJ+lYOIJy/dXBW9ka0oEqyf95MSarbiv2+blSfg\nrZ6oAbmm++CcOUcSPFdyqMdlhXvWazj4j+mv2cfXgQKBgQDdmr5S4JTOxjfDlwoN\nHk5PN6az/NyboN7RJWLWJlvv3iR4bxMsXjbEYdOcyTvWygk6S40urVvfP3bOxJOK\npjWMnGs9EjkofVMIvUzJ1YceeMdqOemtBuhbqtnPpb+ESCmsvyR6RB//B6B5+874\nSnL+7+n7CUhDBurVveajKHtLgQKBgQC1bbDDBMQbqkUud2HO5BQ00rKqwzXgRpW4\nyhK9tdXxD8rlVJaAjxkQ72x2iOpLtvUBz3AFrGDQ5CKQ1FS6kHbCcafO2/b5myz1\n6Hun13cXSa2zZqvQGSob/DUWbSvKUG/CRbMvFtrNOmlbtsFehifco3B6aqwGMuDE\nke7uywlqCwKBgHWX/PELvctwAf1nc+z8LP/6fxq5zvNCzZpcZXNQTa8eyWmjP6Bm\nqldRtjJX0soq0fS+TL/9PGheTBRy2fxUMMxZ4Mo6llw3DM3xbgMYrSftXZyv+KFZ\nrgmewxBeWx++D2dc0uWSqwvxJyY0CmNVVmqUMyyEg3UWAZ3EtNPV0n+BAoGAThQC\nuirW6sEAPNsLsKnfOExkr7CLAxXdYUU1g4c5pyCQxNj+XB05QFyJZQnPKv51um23\nW/mvQLatWX7HZ/K76TpYaWGojAsH8lw2uyizC8adhlNtJYVu5dRIVHpvGgY70nOE\nhYNkbmXw6ZNg7Hj3trBvu38kwRYsPOxA02t1hbkCgYBurZV+wvpmpWE3iFTEtFSk\nDFWmeWIkjhqH4ghEnDXy9nRHFyTmyw22jF88mtNvbZ31kwXEmZKmX3CeUSNuTuB6\nGY0z1u7QavDjxe+pFc27RU+ifpZnHfdVW6B6mCpR9MkI5H5Nq6mmYD4rLITbi3/8\nHelsaPPX/i3aELObdsKssQ==\n-----END PRIVATE KEY-----\n",
        client_email: "upload-file@j-irais-bruler-chez-vous.iam.gserviceaccount.com",
      }
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
