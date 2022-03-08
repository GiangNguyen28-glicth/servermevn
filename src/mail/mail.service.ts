import { BadRequestException, forwardRef, HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as nodemailer from "nodemailer";
import { MailForgotpassword } from 'src/common/emailtemplate/mail.forgotpassword';
import { MailTemplateVerifyLink } from 'src/common/emailtemplate/mail.verify';
import { SendMail } from 'src/common/enum/enum';
import { UserService } from 'src/user/user.service';
@Injectable()
export class MailService {
  constructor(
    @Inject(forwardRef(() => UserService)) private userService: UserService,
    private jwtservice: JwtService
  ) { }
  async sendEmail(email: string, username: string, option: string): Promise<void> {

    const html = await this.configtemplate(email,option,username);
    const transporter = await nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "shopme293@gmail.com",
        pass: "nxcyezzyxxuqvxor", // naturally, replace both with your real credentials or an application-specific password
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
  async decodeConfirmationToken(token: string) {
    try {
      const payload = await this.jwtservice.verify(token, {
        secret: process.env.JWT_VERIFICATION_TOKEN_SECRET,
      });
      if (typeof payload === 'object' && 'email' in payload) {
        return payload.email;
      }
      throw new BadRequestException();
    } catch (error) {
      if (error?.name === 'TokenExpiredError') {
        throw new HttpException('Email confirmation token expired', HttpStatus.BAD_REQUEST);
      }
      throw new HttpException('Bad confirmation token', HttpStatus.BAD_REQUEST);
    }
  }

  async confirmEmail(email: string) {
    const user = await this.userService.getByEmail(email);
    if (user.isEmailConfirmed) {
      throw new HttpException('Email already confirmed', HttpStatus.BAD_REQUEST);
    }
    await this.userService.markEmailAsConfirmed(email);
  }

  async configtemplate(email?,option?: string, username?: string): Promise<any> {
    let html;
    if (option == SendMail.REGISTER) {
      const payload = { email };
      const token = await this.jwtservice.sign(payload, {
        secret: process.env.JWT_VERIFICATION_TOKEN_SECRET,
        expiresIn: `${process.env.JWT_VERIFICATION_TOKEN_EXPIRATION_TIME}s`
      });
      MailTemplateVerifyLink.link = `${process.env.EMAIL_CONFIRMATION_URL}?token=${token}`;
      MailTemplateVerifyLink.fullname = username;
      html = MailTemplateVerifyLink.HTMLLink();
    }
    else if (option == SendMail.FORGOT_PASSWORD) {
      html = MailForgotpassword.HTMLLink();
    }
    return html;
  }
}
