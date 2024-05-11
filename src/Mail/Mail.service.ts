import { Injectable } from '@nestjs/common';
import { Maildata } from './interfaces/maildata.interface';
import { SESv2Client, SendEmailCommand } from '@aws-sdk/client-sesv2';
import { RMOrderUpdateTemplate } from './templates/RMOrderUpdate';
const config = require('config') 
const { awsAccessKey, awsSecretAccessKey, awsReagion, awsSender} = config.get('awsSESconfig');

@Injectable()
export class MailService {
  private readonly sesClient: SESv2Client;
  
  constructor() {
    this.sesClient = new SESv2Client({
      region: awsReagion,
      credentials: {
        accessKeyId: awsAccessKey,
        secretAccessKey:awsSecretAccessKey,
      },
    });
  }

  async sendMail(maildata: Maildata): Promise<void> {
    const htmlMail = RMOrderUpdateTemplate(maildata.datamain);
    const params = {
      Destination: {
        ToAddresses: [maildata.mail],
      },
      Content: {
        Simple: {
          Body: {
            Html: {
              Charset: 'UTF-8',
              Data: '<h1> This Is test MAil </h1>',
            },
            Text: {
              Charset: 'UTF-8',
              Data: `${htmlMail}`,
            },
          },
          Subject: {
            Charset: 'UTF-8',
            Data: maildata.subject,
          },
        },
      },
      FromEmailAddress: awsSender,
    };
    try {
      await this.sesClient.send(new SendEmailCommand(params));
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}
