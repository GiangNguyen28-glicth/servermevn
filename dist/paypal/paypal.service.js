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
exports.PaypalService = void 0;
const common_1 = require("@nestjs/common");
const paypal = require("paypal-rest-sdk");
let PaypalService = class PaypalService {
    constructor() { }
    async payment(response, request) {
        const totalPrice = request.cookies.listProduct.reduce((previousValue, currentValue) => {
            return previousValue + currentValue.product.price * currentValue.quantity;
        }, 0);
        const create_payment_json = {
            "intent": "sale",
            "payer": {
                "payment_method": "paypal"
            },
            "redirect_urls": {
                "return_url": "http://localhost:3000/api/v1/paypal/success",
                "cancel_url": "http://localhost:3000/api/v1/paypal/cancel"
            },
            "transactions": [{
                    "amount": {
                        "currency": "USD",
                        "total": `${totalPrice}`
                    },
                    "description": "Hat for the best team ever"
                }]
        };
        paypal.configure({
            'mode': 'sandbox',
            'client_id': process.env.PAYPAL_CLIENT_ID,
            'client_secret': process.env.PAYPAL_CLIENT_SECRET
        });
        paypal.payment.create(create_payment_json, function (error, payment) {
            if (error) {
                console.log("Error Paypal");
                throw error;
            }
            else {
                for (let i = 0; i < payment.links.length; i++) {
                    if (payment.links[i].rel === 'approval_url') {
                        response.send(payment.links[i].href);
                    }
                }
            }
        });
    }
    async Success(response, request) {
        const totalPrice = request.cookies.listProduct.reduce((previousValue, currentValue) => {
            return previousValue + currentValue.product.price * currentValue.quantity;
        }, 0);
        const payerId = request.query.PayerID;
        const paymentId = request.query.paymentId;
        const execute_payment_json = {
            "payer_id": payerId,
            "transactions": [{
                    "amount": {
                        "currency": "USD",
                        "total": `${totalPrice}`
                    }
                }]
        };
        paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
            if (error) {
                throw error;
            }
            else {
                response.clearCookie("listProduct");
                response.send('Success');
            }
        });
    }
};
PaypalService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], PaypalService);
exports.PaypalService = PaypalService;
//# sourceMappingURL=paypal.service.js.map