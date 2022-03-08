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
exports.PaypalController = void 0;
const common_1 = require("@nestjs/common");
const paypal_service_1 = require("./paypal.service");
let PaypalController = class PaypalController {
    constructor(paypalservice) {
        this.paypalservice = paypalservice;
    }
    PayPal(response, request) {
        return this.paypalservice.payment(response, request);
    }
    Success(response, request) {
        return this.paypalservice.Success(response, request);
    }
    Cancel(response, request) {
        return "Cancel";
    }
};
__decorate([
    (0, common_1.Get)('/checkout'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], PaypalController.prototype, "PayPal", null);
__decorate([
    (0, common_1.Get)('/success'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], PaypalController.prototype, "Success", null);
__decorate([
    (0, common_1.Get)('/cancel'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], PaypalController.prototype, "Cancel", null);
PaypalController = __decorate([
    (0, common_1.Controller)('paypal'),
    __metadata("design:paramtypes", [paypal_service_1.PaypalService])
], PaypalController);
exports.PaypalController = PaypalController;
//# sourceMappingURL=paypal.controller.js.map