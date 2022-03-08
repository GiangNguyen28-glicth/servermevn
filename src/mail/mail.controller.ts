import { Controller, Get, Query, Res } from '@nestjs/common';
import { MailService } from './mail.service';
import { Response } from 'express';
@Controller('mail')
export class MailController {
    constructor(private mailservice:MailService){}
    @Get('/confirm-email')
    async confirm(@Query() {token},@Res() response:Response) {
      const email = await this.mailservice.decodeConfirmationToken(token);
      await this.mailservice.confirmEmail(email);
      response.redirect("http://localhost:8080/");
    }
}
