import { PutObjectCommand, PutObjectCommandInput, PutObjectCommandOutput, S3Client, UploadPartCommandInput } from "@aws-sdk/client-s3";
import * as mime from 'mime-types'
const {accessKey, secretKey, region}=require('config').get('awsConfig')

const s3Client=new S3Client({
    region:region,
    credentials:{
        accessKeyId:accessKey,
        secretAccessKey:secretKey
    }
})

export const uploadFilesToS3 = async (files: Express.Multer.File[]): Promise<string[]> => {
    const uploadPromises = files.map(async (file) => {
        const fileExtension = mime.extension(file.mimetype);
        const fileName = `${Date.now()}.${fileExtension}`;
        const uploadParams = {
            Bucket: 'zuttoo-attachments',
            Key: fileName,
            Body: file.buffer,
            ContentType: file.mimetype,
        };

        const uploadResult = await s3Client.send(new PutObjectCommand(uploadParams));
        const s3ObjectUrl = `https://zuttoo-attachments.s3.amazonaws.com/${fileName}`;
        return s3ObjectUrl;
    });

    return Promise.all(uploadPromises);
};