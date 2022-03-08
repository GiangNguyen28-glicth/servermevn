import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Transform } from "class-transformer";
import * as mongoose from "mongoose";
import { ObjectId } from "mongoose";
import { User } from "src/user/schema/user.schema";
import { TypeInformation } from "../dto/Information.dto";
export type InformationDocument = Information & Document;
@Schema()
export class Information{
    @Transform(({value})=>value.toString())
    _id:String;
    @Prop({type:mongoose.Schema.Types.ObjectId,ref:"User",required:true})
    userId:ObjectId;
    @Prop()
    socketId:string;
    @Prop()
    type: TypeInformation;
    @Prop()
    user:User;
}
export const InformationSchema= SchemaFactory.createForClass(Information);