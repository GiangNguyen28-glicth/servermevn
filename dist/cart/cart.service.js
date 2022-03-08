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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartService = void 0;
const common_1 = require("@nestjs/common");
const product_service_1 = require("../product/product.service");
let CartService = class CartService {
    constructor(productservice) {
        this.productservice = productservice;
    }
    async addtoCart(req, response, id, quantity) {
        let listProduct = [];
        const cookie = req.cookies.listProduct;
        const product = await this.productservice.findOneProdct(id);
        const productCustomize = {
            product: product,
            quantity: quantity,
        };
        if (cookie != undefined && (cookie === null || cookie === void 0 ? void 0 : cookie.lenght) != 0) {
            listProduct = req.cookies.listProduct;
            const productExisting = listProduct.filter((elment) => {
                if (elment.product._id == id) {
                    elment.quantity = elment.quantity + 1;
                    return elment;
                }
            });
            if (productExisting.length == 0) {
                listProduct.push(productCustomize);
            }
        }
        else {
            listProduct.push(productCustomize);
        }
        response.cookie('listProduct', listProduct, {
            path: '/',
            httpOnly: true,
            expires: new Date(Date.now() + 90000000),
        });
        response.send();
    }
    async getValueinCookie(request) {
        return request.cookies.listProduct;
    }
    async deleteCookie(response) {
        response.clearCookie("listProduct");
        response.end();
    }
    async deleteProductFromCookies(req, res, id) {
        let listProduct = [];
        const cookie = req.cookies.listProduct;
        if (cookie != undefined && (cookie === null || cookie === void 0 ? void 0 : cookie.lenght) != 0) {
            listProduct = cookie.filter(element => element.product._id != id);
        }
        res.cookie('listProduct', listProduct, {
            path: '/',
            httpOnly: true,
            expires: new Date(Date.now() + 90000000),
        });
        res.send(listProduct);
    }
    async updateCart(req, res, id, quantity) {
        let listProduct = [];
        const cookie = req.cookies.listProduct;
        if (cookie != undefined && (cookie === null || cookie === void 0 ? void 0 : cookie.lenght) != 0) {
            listProduct = cookie.filter((element) => {
                if (element.product._id == id) {
                    element.quantity = quantity;
                }
                return element;
            });
        }
        res.cookie('listProduct', listProduct, {
            path: '/',
            httpOnly: true,
            expires: new Date(Date.now() + 90000000),
        });
        res.send(listProduct);
    }
};
CartService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [product_service_1.ProductService])
], CartService);
exports.CartService = CartService;
//# sourceMappingURL=cart.service.js.map