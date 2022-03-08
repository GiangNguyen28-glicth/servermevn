import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ObjectId } from "mongoose";
import * as mongoose from 'mongoose'
import { Transform, Type } from "class-transformer";
import { User } from "./user.schema";
export type TokenDocument= Token & Document;
@Schema()
export class Token{
    @Transform(({value})=>value.toString())
    _id:ObjectId;
    @Prop()
    refreshtoken:string;
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
    @Type(()=>User)
    userId:ObjectId;
}
export const TokenSchema=SchemaFactory.createForClass(Token);