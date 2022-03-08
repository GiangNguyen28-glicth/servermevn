import * as mongoose from "mongoose";
import { ObjectId } from "mongoose";
export declare type MessageRecipientDocument = MessageRecipient & Document;
export declare class MessageRecipient {
    _id: ObjectId;
    receiverId: ObjectId;
    messageId: ObjectId;
    createdAt: Date;
}
export declare const MessageRecipientSchema: mongoose.Schema<mongoose.Document<MessageRecipient, any, any>, mongoose.Model<mongoose.Document<MessageRecipient, any, any>, any, any, any>, any, any>;
