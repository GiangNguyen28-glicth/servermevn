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
exports.CartController = void 0;
const common_1 = require("@nestjs/common");
const ParseInt_1 = require("../common/pipes/ParseInt");
const cart_service_1 = require("./cart.service");
let CartController = class CartController {
    constructor(cartservice) {
        this.cartservice = cartservice;
    }
    async addtoCart(id, quantity, response, req) {
        console.log("Running Add To Cart ...");
        return await this.cartservice.addtoCart(req, response, id, quantity);
    }
    async getCart(request) {
        return await this.cartservice.getValueinCookie(request);
    }
    async deleteCookie(response) {
        return await this.cartservice.deleteCookie(response);
    }
    async deleteProductFromCookies(req, res, id) {
        console.log("Running Remove To Cart ...");
        return await this.cartservice.deleteProductFromCookies(req, res, id);
    }
    async updateCart(id, quantity, req, res) {
        return await this.cartservice.updateCart(req, res, id, quantity);
    }
};
__decorate([
    (0, common_1.Get)('/:id/:quantity'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('quantity', ParseInt_1.ParseDataToIntPipe)),
    __param(2, (0, common_1.Res)()),
    __param(3, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Object, Object]),
    __metadata("design:returntype", Promise)
], CartController.prototype, "addtoCart", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CartController.prototype, "getCart", null);
__decorate([
    (0, common_1.Delete)(),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CartController.prototype, "deleteCookie", null);
__decorate([
    (0, common_1.Delete)('/:id'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], CartController.prototype, "deleteProductFromCookies", null);
__decorate([
    (0, common_1.Get)('number/:id/:quantity'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('quantity', ParseInt_1.ParseDataToIntPipe)),
    __param(2, (0, common_1.Req)()),
    __param(3, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Object, Object]),
    __metadata("design:returntype", Promise)
], CartController.prototype, "updateCart", null);
CartController = __decorate([
    (0, common_1.Controller)('cart'),
    __metadata("design:paramtypes", [cart_service_1.CartService])
], CartController);
exports.CartController = CartController;
//# sourceMappingURL=cart.controller.js.map