import { Response, Request } from 'express';
export declare class PaypalService {
    constructor();
    payment(response: Response, request: Request): Promise<void>;
    Success(response: any, request: any): Promise<void>;
}
