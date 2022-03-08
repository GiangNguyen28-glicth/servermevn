import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Transform } from "class-transformer";
import { ObjectId } from "mongoose";
export type PasswordResetDocument= PasswordReset & Document;
@Schema()
export class PasswordReset{
    @Transform(({value})=>value.toString())
    _id:ObjectId;
    @Prop()
    email:string;
    @Prop()
    token:string;
    @Prop()
    isUsed:boolean;
    @Prop({type:Date,default:Date.now,expires:60*60*5})
    isExpire:Date;
    @Prop({type:Date,default:Date.now})
    createAt:Date;
}
export const PasswordResetSchema = SchemaFactory.createForClass(PasswordReset);