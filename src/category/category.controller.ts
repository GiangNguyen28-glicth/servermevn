import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CategoryService } from './category.service';

@Controller('categories')
export class CategoryController {
    constructor(
        private categoryservice:CategoryService
    ){}
    @Post()
    async addCategory(@Body(){categoryname}):Promise<any>{
        const data= await this.categoryservice.addCategory({categoryname});
        return data;
    }

    @Get()
    async getCategories():Promise<any>{
        return await this.categoryservice.getCategories();
    }
}
