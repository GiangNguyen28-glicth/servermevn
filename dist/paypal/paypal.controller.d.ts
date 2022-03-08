import { PaypalService } from './paypal.service';
import { Response, Request } from 'express';
export declare class PaypalController {
    private paypalservice;
    constructor(paypalservice: PaypalService);
    PayPal(response: Response, request: Request): Promise<void>;
    Success(response: Response, request: Request): Promise<void>;
    Cancel(response: Response, request: Request): string;
}
