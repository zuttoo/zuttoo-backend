import { DeleteObjectCommand, DeleteObjectCommandInput, PutObjectCommand, PutObjectCommandInput, PutObjectCommandOutput, S3Client, UploadPartCommandInput } from "@aws-sdk/client-s3";
import { BadRequestException } from "@nestjs/common";
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

export const deleteFileFromS3=async(s3Link:string):Promise<void>=>{
    // extract the bucket and key from the s3 Link
    const url=new URL(s3Link);
    const bucketName=url.hostname.split('.')[0];
    const key=url.pathname.substring(1);

    const deleteParams:DeleteObjectCommandInput={
        Bucket:bucketName,
        Key:key,
    };
    try{
        const command=new DeleteObjectCommand(deleteParams);
        await s3Client.send(command);
        console.log(`File deleted successfully: ${s3Link}`);
    }catch(err){
        console.error(`Error deleting file from S3: ${err}`);
        throw new BadRequestException(err);
    }
}