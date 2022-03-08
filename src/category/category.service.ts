import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category, CategoryDocument } from './category.schema';

@Injectable()
export class CategoryService {
    constructor(
        @InjectModel(Category.name) private categorymodel:Model<CategoryDocument>
    ){}
    async addCategory({categoryname}):Promise<any>{
        const category= await this.categorymodel.create({categoryname:categoryname});
        category.save();
        return category;
    }
    async category(categoryname:String):Promise<any>{
        const ctgr = await this.categorymodel.findOne({categoryname:categoryname});
        if(!ctgr) throw new HttpException("Invalid Category Existing",HttpStatus.NOT_FOUND);
        return ctgr;
    }

    async getCategories():Promise<any>{
        return await this.categorymodel.find();
    }
}
