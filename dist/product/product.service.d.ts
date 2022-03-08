import { Model } from 'mongoose';
import { CategoryService } from 'src/category/category.service';
import { ProductDTO } from './dto/product.dto';
import { Product, ProductDocument } from './product.schema';
export declare class ProductService {
    private productmodel;
    private categoryservice;
    constructor(productmodel: Model<ProductDocument>, categoryservice: CategoryService);
    addProduct(productdto: ProductDTO): Promise<any>;
    getAllProducts(): Promise<any>;
    findOneProdct(_id: any): Promise<Product>;
}
