import { Model, ObjectId } from 'mongoose';
import { User, UserDocument } from './schema/user.schema';
import { Tokens } from 'src/common/enum/enum';
import { UserDTO } from './dto/user.dto';
import { JwtService } from '@nestjs/jwt';
import { TokenDocument } from './schema/token.schema';
import { MailService } from 'src/mail/mail.service';
import { PasswordResetDocument } from './schema/password_reset';
import { ExcelFile } from 'src/utils/solve.excel';
import { Response } from 'express';
export declare class UserService {
    private usermodel;
    private tokenmodel;
    private passwordresetmodel;
    private mailservice;
    private jwtservice;
    private excelservice;
    constructor(usermodel: Model<UserDocument>, tokenmodel: Model<TokenDocument>, passwordresetmodel: Model<PasswordResetDocument>, mailservice: MailService, jwtservice: JwtService, excelservice: ExcelFile);
    register(userdto: UserDTO): Promise<any>;
    login({ username, password }: {
        username: any;
        password: any;
    }): Promise<any>;
    getTokens(_id: ObjectId, username: string): Promise<Tokens>;
    updateRtHash(userId: ObjectId, refreshToken: string): Promise<void>;
    refreshtoken(userId: ObjectId, rftoken: string): Promise<any>;
    getByEmail(email: string): Promise<User>;
    markEmailAsConfirmed(email: string): Promise<User>;
    forgotPassword({ email }: {
        email: any;
    }): Promise<any>;
    resetpassword({ token, password, password_confirm }: {
        token: any;
        password: any;
        password_confirm: any;
    }): Promise<any>;
    findOneUser(_id: any): Promise<User>;
    exportUserToExcel(workSheetColumns: any, workSheetName: any, filePath: any): void;
    downloadReportUserToExcel(res: Response): Promise<any>;
    importUser(path: any): void;
}
