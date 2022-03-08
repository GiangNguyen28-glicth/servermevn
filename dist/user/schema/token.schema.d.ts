import { ObjectId } from "mongoose";
import * as mongoose from 'mongoose';
export declare type TokenDocument = Token & Document;
export declare class Token {
    _id: ObjectId;
    refreshtoken: string;
    userId: ObjectId;
}
export declare const TokenSchema: mongoose.Schema<mongoose.Document<Token, any, any>, mongoose.Model<mongoose.Document<Token, any, any>, any, any, any>, any, any>;
