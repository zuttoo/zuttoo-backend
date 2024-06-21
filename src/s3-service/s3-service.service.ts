import { Injectable } from '@nestjs/common';
import { S3, PutObjectCommand, PutObjectCommandOutput, GetObjectCommand, GetObjectCommandOutput } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
const { accessKey, secretKey, region } = require('config').get('awsConfig');

@Injectable()
export class S3ServiceService {
  private s3: S3;

  constructor() {
    this.s3 = new S3({
      region: region,
      credentials: {
        accessKeyId: accessKey,
        secretAccessKey: secretKey,
      },
    });
  }

  async uploadFiles(files: Express.Multer.File[], bucket: string, folder: string): Promise<string[]> {
    const uploadPromises: Promise<PutObjectCommandOutput>[] = [];
    const uploadedFilesUrls: string[] = [];

    for (const file of files) {
      const key = `${folder}/${Date.now()}_${file.originalname}`;
      const params = {
        Bucket: bucket,
        Key: key,
        Body: file.buffer,
        ContentType: file.mimetype,
      };

      const command = new PutObjectCommand(params);
      uploadPromises.push(this.s3.send(command));
    }

    try {
      const uploadResults = await Promise.all(uploadPromises);
      uploadResults.forEach((result) => {
        uploadedFilesUrls.push(`https://${bucket}.s3.${region}.amazonaws.com/${result.Key}`);
      });
      return uploadedFilesUrls;
    } catch (err) {
      console.log('Error uploading files:', err);
      throw err;
    }
  }

  async getPreSignedURL(bucketName: string, key: string, ContentType: string) {
    try {
      const params = {
        Bucket: bucketName,
        Key: key,
        ContentType: ContentType,
      };

      const command = new GetObjectCommand(params);
      const presignedUrl = await getSignedUrl(this.s3, command, { expiresIn: 3600 });
      return presignedUrl;
    } catch (error) {
      console.log('Error generating pre-signed URL:', error);
      throw error;
    }
  }
}