import { Controller, Delete, Get, Param, Post, Req, Res } from '@nestjs/common';
import { Response, Request } from 'express';
import { ParseDataToIntPipe } from 'src/common/pipes/ParseInt';
import { CartService } from './cart.service';

@Controller('cart')
export class CartController {
    constructor(private cartservice: CartService) { }

    @Get('/:id/:quantity')
    async addtoCart(@Param('id') id, @Param('quantity', ParseDataToIntPipe) quantity: number, @Res() response: Response, @Req() req: Request): Promise<any> {
        console.log("Running Add To Cart ...")
        return await this.cartservice.addtoCart(req, response, id, quantity);
    }

    @Get()
    async getCart(@Req() request: Request): Promise<any> {
        return await this.cartservice.getValueinCookie(request);
    }

    @Delete()
    async deleteCookie(@Res() response: Response): Promise<any> {
        return await this.cartservice.deleteCookie(response);
    }

    @Delete('/:id')
    async deleteProductFromCookies(@Req() req:Request,@Res() res:Response,@Param('id') id):Promise<any>{
        console.log("Running Remove To Cart ...")
        return await this.cartservice.deleteProductFromCookies(req,res,id);
    }

    @Get('number/:id/:quantity')
    async updateCart(@Param('id') id,@Param('quantity',ParseDataToIntPipe) quantity:number,@Req() req:Request,@Res() res:Response):Promise<any>{
        return await this.cartservice.updateCart(req,res,id,quantity);
    }
}
