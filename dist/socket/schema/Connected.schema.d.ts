import { ObjectId } from "mongoose";
import * as mongoose from 'mongoose';
export declare type ConnectedDocument = Connected & Document;
export declare class Connected {
    _id: ObjectId;
    socketId: string;
    userId: ObjectId;
}
export declare const ConnectedSchema: mongoose.Schema<mongoose.Document<Connected, any, any>, mongoose.Model<mongoose.Document<Connected, any, any>, any, any, any>, any, any>;
