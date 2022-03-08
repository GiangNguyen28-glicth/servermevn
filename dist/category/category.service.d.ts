import { Model } from 'mongoose';
import { CategoryDocument } from './category.schema';
export declare class CategoryService {
    private categorymodel;
    constructor(categorymodel: Model<CategoryDocument>);
    addCategory({ categoryname }: {
        categoryname: any;
    }): Promise<any>;
    category(categoryname: String): Promise<any>;
    getCategories(): Promise<any>;
}
