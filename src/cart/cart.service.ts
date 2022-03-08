import { Injectable } from '@nestjs/common';
import { ProductService } from 'src/product/product.service';
import { Response, Request } from 'express';
@Injectable()
export class CartService {
    constructor(
        private readonly productservice: ProductService
    ) { }

    async addtoCart(req, response, id, quantity): Promise<any> {
        let listProduct = [];
        const cookie = req.cookies.listProduct;
        const product = await this.productservice.findOneProdct(id);
        const productCustomize = {
            product: product,
            quantity: quantity,
        }
        if (cookie != undefined && cookie?.lenght != 0) {
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

    async getValueinCookie(request: Request): Promise<any> {
        return request.cookies.listProduct;
    }

    async deleteCookie(response: Response): Promise<any> {
        response.clearCookie("listProduct");
        response.end();
    }

    async deleteProductFromCookies(req: Request, res: Response, id): Promise<any> {
        let listProduct = [];
        const cookie = req.cookies.listProduct;
        if (cookie != undefined && cookie?.lenght != 0) {
            listProduct = cookie.filter(element => element.product._id != id)
        }
        res.cookie('listProduct', listProduct, {
            path: '/',
            httpOnly: true,
            expires: new Date(Date.now() + 90000000),
        });
        res.send(listProduct);
    }

    async updateCart(req: Request, res: Response, id, quantity: number): Promise<void> {
        let listProduct = [];
        const cookie = req.cookies.listProduct;
        if (cookie != undefined && cookie?.lenght != 0) {
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
}
