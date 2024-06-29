import { BadRequestException, Injectable } from '@nestjs/common';
import { AnalyzeDocumentCommand, AnalyzeDocumentCommandInput, AnalyzeDocumentCommandOutput, AnalyzeDocumentRequest, TextractClient } from '@aws-sdk/client-textract';
import { S3Service } from 'src/s3-service/s3-service';
import { retry } from 'rxjs';
import { response } from 'express';
import { TestCertificateDto } from 'src/quality-assurance/dto/test-certificate.dto';
import { TestCertificate } from 'src/quality-assurance/entities/test-certificate.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
const {accessKey, secretKey,region}=require('config').get('awsConfig');
const {s3BucketName}=require('config').get('awsS3BucketConfig');
@Injectable()
export class OcrService {
    // text tract service
    private textract:TextractClient;
    
    constructor(
        private s3Service:S3Service,
        @InjectRepository(TestCertificate) private testCertificateRepository:Repository<TestCertificate>,
        
    ){
        this.textract=new TextractClient({
            region:region,
            credentials:{
                accessKeyId:accessKey,
                secretAccessKey:secretKey
            },
        });
    }

    async processTestCertificate(file: Express.Multer.File): Promise<TestCertificateDto[]> {
        const { result, downloadUrl } = await this.s3Service.uploadFileToS3(file);
        if (!result || !downloadUrl) {
            throw new BadRequestException("Error occurred while uploading the file");
        }

        const s3Key = this.extractS3KeyFromUrl(downloadUrl);
        if (!s3Key) {
            throw new BadRequestException("Unable to extract S3 key from the download URL");
        }

        const textractResponse = await this.processFilesWithTextract(s3Key);
        const extractedCertificates = this.extractTestCertificates(textractResponse);
        console.log(extractedCertificates);
        // Save extracted certificates to the database
        const savedCertificates = await Promise.all(
            extractedCertificates.map(cert => this.saveTestCertificate(cert))
        );
   
        return savedCertificates;
    }

    private extractS3KeyFromUrl(url: string): string | null {
        try {
            const parsedUrl = new URL(url);
            const pathSegments = parsedUrl.pathname.split('/');
            const filename = pathSegments[pathSegments.length - 1];
            return decodeURIComponent(filename);
        } catch (error) {
            console.error("Error extracting S3 key from URL:", error);
            return null;
        }
    }


    async processFilesWithTextract(s3Key:string):Promise<AnalyzeDocumentCommandOutput>{
        const params:AnalyzeDocumentCommandInput={
            Document:{
                S3Object:{
                    Bucket:s3BucketName,
                    Name:s3Key
                },
            },
            FeatureTypes:['FORMS', 'TABLES']
        };
        const command=new AnalyzeDocumentCommand(params);
        const result:AnalyzeDocumentCommandOutput=await this.textract.send(command);
        console.log(result);
        return result;
        
    }

    private extractTestCertificates(textractResponse:AnalyzeDocumentCommandOutput):TestCertificateDto[]{
        const certificates: TestCertificateDto[]=[];
        let currentCertificate:Partial<TestCertificateDto>={};

        textractResponse.Blocks.forEach(block=>{
            if(block.BlockType==='LINE'){
                const text=block.Text.toLowerCase();
                if(text.includes('test certificate no')){
                    // if the current certificate is having key-value pair
                    if(Object.keys(currentCertificate).length>0){
                        certificates.push(currentCertificate as TestCertificateDto);
                    }
                    currentCertificate.testCertificateNo=this.extractValue(block.Text);
                }else if(text.includes('do no')){
                    currentCertificate.doNo=this.extractValue(block.Text);
                }else if(text.includes('invoice no')){
                    currentCertificate.invoiceNo=this.extractValue(block.Text);
                }
            }
        });
        if(Object.keys(currentCertificate).length>0){
            certificates.push(currentCertificate as TestCertificateDto);
        }
        return certificates;
    }

    private extractValue(text:string):string{
        return text.split(':')[1]?.trim() || '';
    }

    private async saveTestCertificate(certData: TestCertificateDto):Promise<TestCertificate>{
        const testCertificate=this.testCertificateRepository.create(certData);
        return await this.testCertificateRepository.save(testCertificate);
    }
    async uploadDocumentToS3Bucket(file:Express.Multer.File):Promise<any>{
        return await this.s3Service.uploadFileToS3(file);
    }
}
