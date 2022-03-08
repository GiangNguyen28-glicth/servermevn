import { ObjectId } from "mongoose";
import * as mongoose from "mongoose";
export declare type MessageDocument = Message & Document;
export declare class Message {
    _id: ObjectId;
    senderId: ObjectId;
    receiverId: ObjectId;
    message: string;
    creatAt: Date;
}
export declare const MessageSchema: mongoose.Schema<mongoose.Document<Message, any, any>, mongoose.Model<mongoose.Document<Message, any, any>, any, any, any>, any, any>;
