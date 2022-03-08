import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { PaypalService } from './paypal.service';
import { Response, Request } from 'express';
@Controller('paypal')
export class PaypalController {
    constructor(private paypalservice:PaypalService){}
    @Get('/checkout')
    PayPal(@Res() response:Response,@Req() request:Request){
        return this.paypalservice.payment(response,request);
    }

    @Get('/success')
    Success(@Res() response:Response,@Req() request:Request){
       return this.paypalservice.Success(response,request);
    }

    @Get('/cancel')
    Cancel(@Res() response:Response,@Req() request:Request){
       return "Cancel"
    }
}
