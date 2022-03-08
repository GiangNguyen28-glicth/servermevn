import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Transform } from "class-transformer";
import { ObjectId } from "mongoose";
import * as mongoose from "mongoose";
export type ProductDocument= Product & Document;
@Schema()
export class Product{
    @Transform(({value})=>value.toString())
    _id:ObjectId;
    @Prop({required:true})
    productname:string;
    @Prop({required:true})
    quantity:number;
    @Prop({required:true})
    price:number;
    @Prop()
    url:String;
    @Prop({type:mongoose.Schema.Types.ObjectId,ref:"Category",required:true})
    categoryId:ObjectId;
}
export const ProductSchema=SchemaFactory.createForClass(Product);