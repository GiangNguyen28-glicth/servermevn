import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoryController } from './category.controller';
import { Category, CategoryShema } from './category.schema';
import { CategoryService } from './category.service';

@Module({
  imports:[MongooseModule.forFeature([{name:Category.name,schema:CategoryShema}])],
  controllers: [CategoryController],
  providers: [CategoryService],
  exports:[CategoryService]
})
export class CategoryModule {}
