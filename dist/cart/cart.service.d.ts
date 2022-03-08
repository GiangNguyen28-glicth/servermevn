import { ProductService } from 'src/product/product.service';
import { Response, Request } from 'express';
export declare class CartService {
    private readonly productservice;
    constructor(productservice: ProductService);
    addtoCart(req: any, response: any, id: any, quantity: any): Promise<any>;
    getValueinCookie(request: Request): Promise<any>;
    deleteCookie(response: Response): Promise<any>;
    deleteProductFromCookies(req: Request, res: Response, id: any): Promise<any>;
    updateCart(req: Request, res: Response, id: any, quantity: number): Promise<void>;
}
