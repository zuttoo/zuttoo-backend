import { BadRequestException, ConsoleLogger, Injectable } from '@nestjs/common';
import { S3,PutObjectCommand, PutObjectCommandOutput, GetObjectCommand, GetObjectCommandOutput, PutObjectCommandInput, PutObjectOutput } from '@aws-sdk/client-s3';

import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { parseArgs } from 'util';
const { accessKey, secretKey, region } = require('config').get('awsConfig');
const {s3BucketName,s3BucketUrl}=require('config').get('awsS3BucketConfig')

@Injectable()
export class S3Service {
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

  // async uploadFiles(files: Express.Multer.File[], bucket: string, folder: string): Promise<string[]> {
  //   const uploadPromises: Promise<PutObjectCommandOutput>[] = [];
  //   const uploadedFilesUrls: string[] = [];

  //   for (const file of files) {
  //     const key = `${folder}/${Date.now()}_${file.originalname}`;
  //     const params = {
  //       Bucket: bucket,
  //       Key: key,
  //       Body: file.buffer,
  //       ContentType: file.mimetype,
  //     };

  //     const command = new PutObjectCommand(params);
  //     uploadPromises.push(this.s3.send(command));
  //   }

  //   try {
  //     const uploadResults = await Promise.all(uploadPromises);
  //     uploadResults.forEach((result) => {
  //       uploadedFilesUrls.push(`https://${bucket}.s3.${region}.amazonaws.com/${result.Key}`);
  //     });
  //     return uploadedFilesUrls;
  //   } catch (err) {
  //     console.log('Error uploading files:', err);
  //     throw err;
  //   }
  // }

  async uploadFileToS3(file:Express.Multer.File):Promise<{result:PutObjectCommandOutput; downloadUrl:string}>{
    const params:PutObjectCommandInput={
      Bucket:s3BucketName,
      Key: `${Date.now()}-${file.originalname}`,
      Body:file.buffer,
      ContentType:file.mimetype,
      Metadata:{
        "product":"TC_UPLOAD",
      },
    }

    try{
  
      const command=new PutObjectCommand(params);
      const result:PutObjectCommandOutput=await this.s3.send(command);

      const downloadUrl=await this.getSignedDownloadUrl(params.Key);
      return {
        result, downloadUrl
      }
    }catch(error){  
      console.log('Error uploading files:', error);
      throw new BadRequestException("Error Uploading Document", error);

    }
  }
  private async getSignedDownloadUrl(key: string): Promise<string> {
    const command = new GetObjectCommand({
      Bucket: s3BucketName,
      Key: key,
    });

    try {
      // Generate a signed URL that expires in 1 hour (3600 seconds)
      const signedUrl = await getSignedUrl(this.s3, command, { expiresIn: 3600 });
      return signedUrl;
    } catch (error) {
      console.log('Error generating signed URL:', error);
      throw new BadRequestException("Error Generating Download URL", error);
    }
  }
}