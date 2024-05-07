import { Module } from '@nestjs/common';
import { MailControler } from './Mail.controller';
import { MailService } from './Mail.service';


@Module({
    controllers: [MailControler],
    providers: [MailService],
})
export class MailModule { }
