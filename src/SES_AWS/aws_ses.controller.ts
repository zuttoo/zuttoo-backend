import { Body, Controller, Inject, Post } from "@nestjs/common";
import { Aws_sesService } from "./aws_ses.service";
import { Maildata } from "./interfaces/maildata.interface";
import { MailDataDto } from "./dto/maildata.dto";



@Controller('mail')
export class Aws_sesControler {
    constructor(@Inject(Aws_sesService) private readonly sesServiece: Aws_sesService) {}

    @Post()
    async sendMail(@Body() maildatadto: MailDataDto) {
        await this.sesServiece.sendMail(maildatadto);
        return {message: "Mail Sent!."}
    }
}