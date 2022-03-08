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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_schema_1 = require("./schema/user.schema");
const bcrypt = require("bcrypt");
const enum_1 = require("../common/enum/enum");
const jwt_1 = require("@nestjs/jwt");
const token_schema_1 = require("./schema/token.schema");
const mail_service_1 = require("../mail/mail.service");
const password_reset_1 = require("./schema/password_reset");
const mail_forgotpassword_1 = require("../common/emailtemplate/mail.forgotpassword");
const solve_excel_1 = require("../utils/solve.excel");
let UserService = class UserService {
    constructor(usermodel, tokenmodel, passwordresetmodel, mailservice, jwtservice, excelservice) {
        this.usermodel = usermodel;
        this.tokenmodel = tokenmodel;
        this.passwordresetmodel = passwordresetmodel;
        this.mailservice = mailservice;
        this.jwtservice = jwtservice;
        this.excelservice = excelservice;
    }
    async register(userdto) {
        const { username, password, confirmpassword, email } = userdto;
        const userExisting = await this.usermodel.findOne({ email: email });
        if (userExisting) {
            throw new common_1.HttpException("USER_EXISTING", common_1.HttpStatus.NOT_FOUND);
        }
        if (password != confirmpassword) {
            throw new common_1.HttpException("PASSWORD_NOT_MATCH", common_1.HttpStatus.NOT_FOUND);
        }
        const salt = await bcrypt.genSalt();
        const hashedpassword = await bcrypt.hash(password, salt);
        const user = await this.usermodel.create({ username, password: hashedpassword, email, role: enum_1.UserRole.USER });
        (await user).save();
        await this.mailservice.sendEmail(email, username, enum_1.SendMail.REGISTER);
        const token = await this.tokenmodel.create({ refreshtoken: null, userId: user._id });
        token.save();
        return user;
    }
    async login({ username, password }) {
        const user = await this.usermodel.findOne({ username: username });
        if (user && (await bcrypt.compare(password, user.password))) {
            const tokens = await this.getTokens(user.id, user.username);
            await this.updateRtHash(user._id, tokens.refresh_token);
            return {
                accessToken: tokens.access_token,
                refreshToken: tokens.refresh_token
            };
        }
        else {
            throw new common_1.HttpException("PLEASE_CHECK_YOUR_USERNAME_AND_PASSWORD", common_1.HttpStatus.UNAUTHORIZED);
        }
    }
    async getTokens(_id, username) {
        const [at, rt] = await Promise.all([
            this.jwtservice.signAsync({
                _id: _id,
                username,
            }, {
                secret: process.env.AT_SECRET,
                expiresIn: 60,
            }),
            this.jwtservice.signAsync({
                _id: _id,
                username,
            }, {
                secret: process.env.RT_SECRET,
                expiresIn: 60 * 60 * 24 * 7,
            }),
        ]);
        return {
            access_token: at,
            refresh_token: rt,
        };
    }
    async updateRtHash(userId, refreshToken) {
        const token = await this.tokenmodel.findOne({ userId: userId });
        if (!token) {
            console.log(3);
            throw new common_1.BadRequestException();
        }
        token.refreshtoken = refreshToken;
        token.save();
    }
    async refreshtoken(userId, rftoken) {
        const tokenOfusers = await this.tokenmodel.findOne({ userId: userId });
        if (tokenOfusers && tokenOfusers.refreshtoken == rftoken) {
            const user = await this.usermodel.findOne({ _id: userId });
            const tokens = await this.getTokens(userId, user.username);
            await this.updateRtHash(userId, tokens.refresh_token);
            return {
                accessToken: tokens.access_token,
                refreshToken: tokens.refresh_token
            };
        }
        else {
            throw new common_1.UnauthorizedException();
        }
    }
    async getByEmail(email) {
        return await this.usermodel.findOne({ email: email });
    }
    async markEmailAsConfirmed(email) {
        return this.usermodel.findOneAndUpdate({ email: email }, {
            isExprise: null,
            isEmailConfirmed: true,
        });
    }
    async forgotPassword({ email }) {
        await this.passwordresetmodel.findOneAndDelete({ email });
        const token = Math.random().toString(20).substring(2, 20);
        await this.passwordresetmodel.create({ email, token });
        mail_forgotpassword_1.MailForgotpassword.token = token;
        await this.mailservice.sendEmail(email, "", enum_1.SendMail.FORGOT_PASSWORD);
        return {
            message: "Please check your mail"
        };
    }
    async resetpassword({ token, password, password_confirm }) {
        if (password !== password_confirm) {
            throw new common_1.HttpException("PASSWORD_NOT_MATCH", common_1.HttpStatus.NOT_FOUND);
        }
        const password_reset = await this.passwordresetmodel.findOne({ token: token });
        if (!password_reset) {
            throw new common_1.HttpException("Code Expired or code Invalid", common_1.HttpStatus.NOT_FOUND);
        }
        const userId = await this.usermodel.findOne({ email: password_reset.email });
        if (!userId) {
            throw new common_1.HttpException("User not found", common_1.HttpStatus.NOT_FOUND);
        }
        const salt = await bcrypt.genSalt();
        const hashedpassword = await bcrypt.hash(password, salt);
        await this.usermodel.findOneAndUpdate({ _id: userId._id }, { password: hashedpassword });
        return {
            message: "Update success",
        };
    }
    async findOneUser(_id) {
        const data = await this.usermodel.findOne({ _id: _id });
        return data;
    }
    exportUserToExcel(workSheetColumns, workSheetName, filePath) {
        const users = [{
                id: 1,
                name: "Hola",
            },
            {
                id: 2,
                name: "Tutu"
            }
        ];
        const data = users.map(user => {
            return [user.id, user.name];
        });
        this.excelservice.exportExcel(data, workSheetColumns, workSheetName, filePath);
    }
    async downloadReportUserToExcel(res) {
        await this.excelservice.exportExcel2(res);
    }
    importUser(path) {
        this.excelservice.importExcel(path);
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __param(1, (0, mongoose_1.InjectModel)(token_schema_1.Token.name)),
    __param(2, (0, mongoose_1.InjectModel)(password_reset_1.PasswordReset.name)),
    __param(3, (0, common_1.Inject)((0, common_1.forwardRef)(() => mail_service_1.MailService))),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mail_service_1.MailService,
        jwt_1.JwtService,
        solve_excel_1.ExcelFile])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map