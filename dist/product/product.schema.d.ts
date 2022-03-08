import { ObjectId } from "mongoose";
import * as mongoose from "mongoose";
export declare type ProductDocument = Product & Document;
export declare class Product {
    _id: ObjectId;
    productname: string;
    quantity: number;
    price: number;
    url: String;
    categoryId: ObjectId;
}
export declare const ProductSchema: mongoose.Schema<mongoose.Document<Product, any, any>, mongoose.Model<mongoose.Document<Product, any, any>, any, any, any>, any, any>;
