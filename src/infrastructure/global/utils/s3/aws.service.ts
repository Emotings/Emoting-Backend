import { HttpException, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import * as AWS from 'aws-sdk';

@Injectable()
export class AwsService {
    private s3Client
    constructor(private config: ConfigService) {
        this.s3Client = new AWS.S3({
            accessKeyId: config.get('AWS_S3_ACCESS_KEY'),
            secretAccessKey: config.get('AWS_S3_SECRET_KEY'),
            region: config.get('AWS_S3_REGION'),
        });
    }
    async upload(fileName: string, file) {
        const allowedExtensions = ['jpg', 'jpeg', 'png', 'gif'];

        const extension = file.originalname.split('.').pop()

        if (!allowedExtensions.includes(extension)) {
            throw new HttpException('Unsupported file extension', 400);
        }
        const command = {
            Bucket: this.config.get('AWS_S3_BUCKET_NAME'),
            Key: fileName,
            Body: file.buffer,
            ACL: 'public-read',
            ContentType: file.mimeType,
        }

        await this.s3Client.upload(command).promise()

        return `https://s3.${this.config.get('AWS_S3_REGION')}.amazonaws.com/${this.config.get('AWS_S3_BUCKET_NAME')}/${fileName}`;
    }
}