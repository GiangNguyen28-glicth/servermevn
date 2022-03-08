import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CategoryService } from 'src/category/category.service';
import { ProductDTO } from './dto/product.dto';
import { Product, ProductDocument } from './product.schema';

@Injectable()
export class ProductService {
    constructor(@InjectModel(Product.name) private productmodel:Model<ProductDocument>,
    private categoryservice:CategoryService){}
    async addProduct(productdto:ProductDTO):Promise<any>{
        try{
            const { productname, quantity,url,categoryname }=productdto;
            const category=await this.categoryservice.category(categoryname);
            const product= await this.productmodel.create({productname,quantity,url,categoryId:category._id});
            product.save();
            return product;
        }catch(error){
            throw new HttpException(error.message,HttpStatus.BAD_REQUEST)
        }
    }
    async getAllProducts():Promise<any>{
        return await this.productmodel.find();
    }
    async findOneProdct(_id):Promise<Product>{
        return await this.productmodel.findOne({_id});
    }
}
