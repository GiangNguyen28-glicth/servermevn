import { Response, Request } from 'express';
import { CartService } from './cart.service';
export declare class CartController {
    private cartservice;
    constructor(cartservice: CartService);
    addtoCart(id: any, quantity: number, response: Response, req: Request): Promise<any>;
    getCart(request: Request): Promise<any>;
    deleteCookie(response: Response): Promise<any>;
    deleteProductFromCookies(req: Request, res: Response, id: any): Promise<any>;
    updateCart(id: any, quantity: number, req: Request, res: Response): Promise<any>;
}
