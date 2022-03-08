import { ObjectId } from "mongoose";
import * as mongoose from 'mongoose';
export declare type JoinedRoomDocument = JoinedRoom & Document;
export declare class JoinedRoom {
    _id: ObjectId;
    socketId: string;
    userId: ObjectId;
    roomId: ObjectId;
}
export declare const JoinedRoomSchema: mongoose.Schema<mongoose.Document<JoinedRoom, any, any>, mongoose.Model<mongoose.Document<JoinedRoom, any, any>, any, any, any>, any, any>;
