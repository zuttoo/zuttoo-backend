import { Body, Controller, Inject, Post } from "@nestjs/common";
import { MailService } from "./Mail.service";
import { Maildata } from "./interfaces/maildata.interface";
import { MailDataDto } from "./dto/maildata.dto";



@Controller('mail')
export class MailControler {
    constructor(@Inject(MailService) private readonly sesServiece: MailService) {}

    @Post()
    async sendMail(@Body() maildatadto: MailDataDto) {
        await this.sesServiece.sendMail(maildatadto);
        return {message: "Mail Sent!."}
    }
}