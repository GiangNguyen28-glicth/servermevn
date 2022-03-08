import { ProductDTO } from './dto/product.dto';
import { ProductService } from './product.service';
export declare class ProductController {
    private productservice;
    constructor(productservice: ProductService);
    addProduct(productdto: ProductDTO): Promise<any>;
    getAllProducts(): Promise<any>;
    findOneProduct(id: any): Promise<any>;
}
