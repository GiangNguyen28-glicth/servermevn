import { MailService } from './mail.service';
import { Response } from 'express';
export declare class MailController {
    private mailservice;
    constructor(mailservice: MailService);
    confirm({ token }: {
        token: any;
    }, response: Response): Promise<void>;
}
