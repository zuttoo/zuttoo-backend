import { Injectable } from "@nestjs/common";
import { Maildata } from "./interfaces/maildata.interface";
import { SESv2Client, SendEmailCommand } from "@aws-sdk/client-sesv2";

@Injectable()
export class Aws_sesService {

    private readonly sesClient: SESv2Client;

    constructor() {
        this.sesClient = new SESv2Client({
            region: process.env.AWS_SES_REGION,
            credentials: {
                accessKeyId: process.env.AWS_ACCESS_KEY,
                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
            }
        })
    }

    async sendMail(maildata: Maildata): Promise<void> {
        const params = {
            Destination: {
                ToAddresses: [maildata.mail],
            },
            Content: {
                Simple: {
                    Body: {
                        Html: {
                            Charset: "UTF-8",
                            Data: "<h1> This Is test MAil </h1>"
                        },
                        Text: {
                            Charset: "UTF-8",
                            Data: maildata.data,
                        },
                    },
                    Subject: {
                        Charset: "UTF-8",
                        Data: maildata.subject,
                    },
                },
            },
            FromEmailAddress: process.env.AWS_SES_SWNDER,
        };
        try {
            await this.sesClient.send(new SendEmailCommand(params));
        }catch (err) {
            console.log(err);
            throw err;
        }

    }
}