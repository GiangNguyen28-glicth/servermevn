import { BadRequestException, forwardRef, HttpException, HttpStatus, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { User, UserDocument } from './schema/user.schema';
import * as bcrypt from "bcrypt";
import { SendMail, Tokens, UserRole } from 'src/common/enum/enum';
import { UserDTO } from './dto/user.dto';
import { JwtService } from '@nestjs/jwt';
import { Token, TokenDocument } from './schema/token.schema';
import { MailService } from 'src/mail/mail.service';
import { PasswordReset, PasswordResetDocument } from './schema/password_reset';
import { MailForgotpassword } from 'src/common/emailtemplate/mail.forgotpassword';
import { ExcelFile } from 'src/utils/solve.excel';
import { Response,Request } from 'express';
@Injectable()
export class UserService {
    constructor(

        @InjectModel(User.name) private usermodel: Model<UserDocument>,
        @InjectModel(Token.name) private tokenmodel: Model<TokenDocument>,
        @InjectModel(PasswordReset.name) private passwordresetmodel: Model<PasswordResetDocument>,
        @Inject(forwardRef(() => MailService))
        private mailservice: MailService,
        private jwtservice: JwtService,
        private excelservice: ExcelFile,
    ) { }
    async register(userdto: UserDTO): Promise<any> {
        const { username, password, confirmpassword, email } = userdto;
        const userExisting = await this.usermodel.findOne({ email: email });
        if (userExisting) {
            throw new HttpException("USER_EXISTING", HttpStatus.NOT_FOUND);
        }
        if (password != confirmpassword) {
            throw new HttpException("PASSWORD_NOT_MATCH", HttpStatus.NOT_FOUND);
        }
        const salt = await bcrypt.genSalt();
        const hashedpassword = await bcrypt.hash(password, salt);
        const user = await this.usermodel.create({ username, password: hashedpassword, email, role: UserRole.USER });
        (await user).save();
        await this.mailservice.sendEmail(email, username, SendMail.REGISTER);
        const token = await this.tokenmodel.create({ refreshtoken: null, userId: user._id });
        token.save();
        return user;
    }
    async login({ username, password }): Promise<any> {
        const user = await this.usermodel.findOne({ username: username });
        if (user && (await bcrypt.compare(password, user.password))) {
            const tokens = await this.getTokens(user.id, user.username);
            await this.updateRtHash(user._id, tokens.refresh_token);
            return {
                accessToken: tokens.access_token,
                refreshToken: tokens.refresh_token
            }
        }
        else {
            throw new HttpException("PLEASE_CHECK_YOUR_USERNAME_AND_PASSWORD", HttpStatus.UNAUTHORIZED);
        }
    }
    async getTokens(_id: ObjectId, username: string): Promise<Tokens> {
        const [at, rt] = await Promise.all([
            this.jwtservice.signAsync(
                {
                    _id: _id,
                    username,
                },
                {
                    secret: process.env.AT_SECRET,
                    expiresIn: 60,
                },
            ),
            this.jwtservice.signAsync(
                {
                    _id: _id,
                    username,
                },
                {
                    secret: process.env.RT_SECRET,
                    expiresIn: 60 * 60 * 24 * 7,
                },
            ),
        ]);
        return {
            access_token: at,
            refresh_token: rt,
        };
    }
    async updateRtHash(userId: ObjectId, refreshToken: string): Promise<void> {
        const token = await this.tokenmodel.findOne({ userId: userId });
        if (!token) {
            console.log(3);
            throw new BadRequestException()
        }
        token.refreshtoken = refreshToken;
        token.save();
    }
    async refreshtoken(userId: ObjectId, rftoken: string): Promise<any> {
        const tokenOfusers = await this.tokenmodel.findOne({ userId: userId });
        if (tokenOfusers && tokenOfusers.refreshtoken == rftoken) {
            const user = await this.usermodel.findOne({ _id: userId })
            const tokens = await this.getTokens(userId, user.username);
            await this.updateRtHash(userId, tokens.refresh_token);
            return {
                accessToken: tokens.access_token,
                refreshToken: tokens.refresh_token
            }
        }
        else {
            throw new UnauthorizedException()
        }
    }
    async getByEmail(email: string): Promise<User> {
        return await this.usermodel.findOne({ email: email });
    }

    async markEmailAsConfirmed(email: string): Promise<User> {
        return this.usermodel.findOneAndUpdate(
            { email: email },
            {
                isExprise: null,
                isEmailConfirmed: true,
            },
        );
    }

    async forgotPassword({ email }): Promise<any> {
        await this.passwordresetmodel.findOneAndDelete({ email });
        const token = Math.random().toString(20).substring(2, 20);
        await this.passwordresetmodel.create({ email, token });
        MailForgotpassword.token = token;
        await this.mailservice.sendEmail(email, "", SendMail.FORGOT_PASSWORD);
        return {
            message: "Please check your mail"
        }
    }

    async resetpassword({ token, password, password_confirm }): Promise<any> {
        if (password !== password_confirm) {
            throw new HttpException("PASSWORD_NOT_MATCH", HttpStatus.NOT_FOUND);
        }
        const password_reset = await this.passwordresetmodel.findOne({ token: token });
        if (!password_reset) {
            throw new HttpException("Code Expired or code Invalid", HttpStatus.NOT_FOUND);
        }
        const userId = await this.usermodel.findOne({ email: password_reset.email });
        if (!userId) {
            throw new HttpException("User not found", HttpStatus.NOT_FOUND);
        }
        const salt = await bcrypt.genSalt();
        const hashedpassword = await bcrypt.hash(password, salt);
        await this.usermodel.findOneAndUpdate({ _id: userId._id }, { password: hashedpassword });
        return {
            message: "Update success",
        }
    }

    async findOneUser(_id):Promise<User> {  
        const data = await this.usermodel.findOne({ _id: _id });
        return data;
    }

    exportUserToExcel(workSheetColumns,workSheetName,filePath) {
        const users = [{
            id: 1,
            name: "Hola",
            },
            {
                id:2,
                name:"Tutu"
            }
        ]
        const data = users.map(user=>{
            return [user.id,user.name]
        })
        this.excelservice.exportExcel(data,workSheetColumns,workSheetName,filePath);
    }

    async downloadReportUserToExcel(res:Response):Promise<any>{
        await this.excelservice.exportExcel2(res);
    }

    importUser(path){
        this.excelservice.importExcel(path);
    }
}
