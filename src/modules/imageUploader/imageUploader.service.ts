import { Injectable } from '@nestjs/common';
import { IimageUploaderService } from './interface/imageUploader.service.interface';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

@Injectable()
export class s3UploaderService implements IimageUploaderService {
  async upload(image: Buffer, filename: string) {
    const client = new S3Client({
      region: process.env.S3_REGION,
      credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY_ID,
        secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
      },
    });

    const now = new Date();
    const timestamp = now.getTime();
    const key = `${timestamp}-${filename}`;

    const params = {
      Bucket: process.env.S3_BUCKET_NAME,
      Key: key,
      Body: image,
    };

    await client.send(new PutObjectCommand(params));
    return `https://${process.env.S3_BUCKET_NAME}.s3.${process.env.S3_REGION}.amazonaws.com/${key}`;
  }
}
