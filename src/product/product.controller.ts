import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { hasRoles } from 'src/common/decorators/role.decorators';
import { UserRole } from 'src/common/enum/enum';
import { AtGuard } from 'src/common/guards/At.guards';
import { ProductDTO } from './dto/product.dto';
import { ProductService } from './product.service';

@Controller('products')
export class ProductController {
    constructor(private productservice:ProductService){}
    @Post()
    @UseGuards(AtGuard)
    @hasRoles(UserRole.ADMIN)
    async addProduct(@Body() productdto:ProductDTO):Promise<any>{
        return this.productservice.addProduct(productdto);
    }

    @Get()
    async getAllProducts():Promise<any>{
        return await this.productservice.getAllProducts();
    }

    @Get('/:id')
    async findOneProduct(@Param('id') id):Promise<any>{
        return await this.productservice.findOneProdct(id);
    }
}
