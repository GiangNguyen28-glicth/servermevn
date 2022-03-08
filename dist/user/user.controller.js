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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const user_dto_1 = require("./dto/user.dto");
const getuser_decorators_1 = require("../common/decorators/getuser.decorators");
const user_schema_1 = require("./schema/user.schema");
const At_guards_1 = require("../common/guards/At.guards");
const getRefreshtoken_decorators_1 = require("../common/decorators/getRefreshtoken.decorators");
const Rt_guards_1 = require("../common/guards/Rt.guards");
const platform_express_1 = require("@nestjs/platform-express");
const config_multer_1 = require("../utils/config.multer");
let UserController = class UserController {
    constructor(userservice) {
        this.userservice = userservice;
    }
    async register(response, userdto) {
        const data = await this.userservice.register(userdto);
        response.status(common_1.HttpStatus.CREATED).json({
            data: data,
            status: "success"
        });
    }
    async login({ username, password }) {
        return await this.userservice.login({ username, password });
    }
    async getUser(user) {
        return user;
    }
    async refreshtoken(rf) {
        return await this.userservice.refreshtoken(rf._id, rf.refreshToken);
    }
    async forgotPassword({ email }) {
        return await this.userservice.forgotPassword({ email });
    }
    async resetPassword({ token, password, password_confirm }) {
        return await this.userservice.resetpassword({ token, password, password_confirm });
    }
    async download(res) {
        return await this.userservice.downloadReportUserToExcel(res);
    }
    exportReport() {
        const workSheetColumns = ["ID", "Name"];
        const filePath = './outputfile/test.xlsx';
        const workSheetName = "Users";
        this.userservice.exportUserToExcel(workSheetColumns, workSheetName, filePath);
    }
    importUser(file) {
        console.log(file);
        this.userservice.importUser(file.path);
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, user_dto_1.UserDTO]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "register", null);
__decorate([
    (0, common_1.Post)("/login"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "login", null);
__decorate([
    (0, common_1.UseGuards)(At_guards_1.AtGuard),
    (0, common_1.Get)(),
    __param(0, (0, getuser_decorators_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_schema_1.User]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUser", null);
__decorate([
    (0, common_1.UseGuards)(Rt_guards_1.RtGuard),
    (0, common_1.Get)('/refreshtoken'),
    __param(0, (0, getRefreshtoken_decorators_1.GetCurrentRefreshToken)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "refreshtoken", null);
__decorate([
    (0, common_1.Post)('/forgotpassword'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "forgotPassword", null);
__decorate([
    (0, common_1.Post)('/resetpassword'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "resetPassword", null);
__decorate([
    (0, common_1.Get)('/downloadreport'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "download", null);
__decorate([
    (0, common_1.Get)('/exportreport'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UserController.prototype, "exportReport", null);
__decorate([
    (0, common_1.Post)('/importdata'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', config_multer_1.multerOption)),
    __param(0, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "importUser", null);
UserController = __decorate([
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map