import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Transform } from "class-transformer";
import { ObjectId } from "mongoose";
import * as mongoose from "mongoose";
export type MessageDocument = Message & Document;
@Schema()
export class Message{
    @Transform(({value})=>value.toString())
    _id:ObjectId;
    
    @Prop({type:mongoose.Schema.Types.ObjectId,ref:"User",required:true})
    senderId:ObjectId;  

    @Prop({type:mongoose.Schema.Types.ObjectId,ref:"User",required:true})
    receiverId:ObjectId;

    @Prop()
    message:string;

    @Prop({type:Date,default:Date.now})
    creatAt:Date;

}
export const MessageSchema = SchemaFactory.createForClass(Message);