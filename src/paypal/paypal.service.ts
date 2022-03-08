import { Injectable } from '@nestjs/common';
import { Response, Request } from 'express';
import * as paypal from "paypal-rest-sdk";
@Injectable()
export class PaypalService {
    constructor(
    ) { }
    async payment(response: Response, request: Request) {
        const totalPrice = request.cookies.listProduct.reduce((previousValue,currentValue)=>{
            return previousValue + currentValue.product.price*currentValue.quantity;
        },0);
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
                    "total":`${totalPrice}`
                },
                "description": "Hat for the best team ever"
            }]
        };
        paypal.configure({
            'mode': 'sandbox', //sandbox or live
            'client_id': process.env.PAYPAL_CLIENT_ID,
            'client_secret': process.env.PAYPAL_CLIENT_SECRET
        });
        paypal.payment.create(create_payment_json, function (error, payment) {
            if (error) {
                console.log("Error Paypal")
                throw error;
            } else {
                for (let i = 0; i < payment.links.length; i++) {
                    if (payment.links[i].rel === 'approval_url') {
                        response.send(payment.links[i].href);
                    }
                }
            }
        });
    }

    async Success(response, request) {
        const totalPrice = request.cookies.listProduct.reduce((previousValue,currentValue)=>{
            return previousValue + currentValue.product.price*currentValue.quantity;
        },0);
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
        };        paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
            if (error) {
                throw error;
            } else {
                response.clearCookie("listProduct");
                response.send('Success');
            }
        });
    }
}
