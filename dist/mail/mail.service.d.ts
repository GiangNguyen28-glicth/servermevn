import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
export declare class MailService {
    private userService;
    private jwtservice;
    constructor(userService: UserService, jwtservice: JwtService);
    sendEmail(email: string, username: string, option: string): Promise<void>;
    decodeConfirmationToken(token: string): Promise<any>;
    confirmEmail(email: string): Promise<void>;
    configtemplate(email?: any, option?: string, username?: string): Promise<any>;
}
