import { CategoryService } from './category.service';
export declare class CategoryController {
    private categoryservice;
    constructor(categoryservice: CategoryService);
    addCategory({ categoryname }: {
        categoryname: any;
    }): Promise<any>;
    getCategories(): Promise<any>;
}
