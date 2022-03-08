import { ObjectId } from "mongoose";
export declare type CategoryDocument = Category & Document;
export declare class Category {
    _id: ObjectId;
    categoryname: string;
}
export declare const CategoryShema: import("mongoose").Schema<import("mongoose").Document<Category, any, any>, import("mongoose").Model<import("mongoose").Document<Category, any, any>, any, any, any>, any, any>;
