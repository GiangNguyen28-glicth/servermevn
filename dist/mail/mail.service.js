"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const nodemailer = require("nodemailer");
const mail_forgotpassword_1 = require("../common/emailtemplate/mail.forgotpassword");
const mail_verify_1 = require("../common/emailtemplate/mail.verify");
const enum_1 = require("../common/enum/enum");
const user_service_1 = require("../user/user.service");
let MailService = class MailService {
    constructor(userService, jwtservice) {
        this.userService = userService;
        this.jwtservice = jwtservice;
    }
    async sendEmail(email, username, option) {
        const html = await this.configtemplate(email, option, username);
        const transporter = await nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "shopme293@gmail.com",
                pass: "nxcyezzyxxuqvxor",
            },
        });
        const mailOptions = {
            from: process.env.FROM_EMAIL,
            to: email,
            subject: 'Confirm Mail ✔',
            html: html,
        };
        await transporter.sendMail(mailOptions);
    }
    async decodeConfirmationToken(token) {
        try {
            const payload = await this.jwtservice.verify(token, {
                secret: process.env.JWT_VERIFICATION_TOKEN_SECRET,
            });
            if (typeof payload === 'object' && 'email' in payload) {
                return payload.email;
            }
            throw new common_1.BadRequestException();
        }
        catch (error) {
            if ((error === null || error === void 0 ? void 0 : error.name) === 'TokenExpiredError') {
                throw new common_1.HttpException('Email confirmation token expired', common_1.HttpStatus.BAD_REQUEST);
            }
            throw new common_1.HttpException('Bad confirmation token', common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async confirmEmail(email) {
        const user = await this.userService.getByEmail(email);
        if (user.isEmailConfirmed) {
            throw new common_1.HttpException('Email already confirmed', common_1.HttpStatus.BAD_REQUEST);
        }
        await this.userService.markEmailAsConfirmed(email);
    }
    async configtemplate(email, option, username) {
        let html;
        if (option == enum_1.SendMail.REGISTER) {
            const payload = { email };
            const token = await this.jwtservice.sign(payload, {
                secret: process.env.JWT_VERIFICATION_TOKEN_SECRET,
                expiresIn: `${process.env.JWT_VERIFICATION_TOKEN_EXPIRATION_TIME}s`
            });
            mail_verify_1.MailTemplateVerifyLink.link = `${process.env.EMAIL_CONFIRMATION_URL}?token=${token}`;
            mail_verify_1.MailTemplateVerifyLink.fullname = username;
            html = mail_verify_1.MailTemplateVerifyLink.HTMLLink();
        }
        else if (option == enum_1.SendMail.FORGOT_PASSWORD) {
            html = mail_forgotpassword_1.MailForgotpassword.HTMLLink();
        }
        return html;
    }
};
MailService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)((0, common_1.forwardRef)(() => user_service_1.UserService))),
    __metadata("design:paramtypes", [user_service_1.UserService,
        jwt_1.JwtService])
], MailService);
exports.MailService = MailService;
//# sourceMappingURL=mail.service.js.map