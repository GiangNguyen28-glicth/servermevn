import { IsNumber, IsString } from "class-validator";

export class ProductDTO{
    @IsString()
    productname:String;
    quantity:Number;
    url:String;
    @IsString()
    categoryname:String;
}