import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from './product.schema';
import { CategoryModule } from 'src/category/category.module';

@Module({
  imports:[MongooseModule.forFeature([{name:Product.name,schema:ProductSchema}]),CategoryModule],
  providers: [ProductService],
  controllers: [ProductController],
  exports:[ProductService]
})
export class ProductModule {}
