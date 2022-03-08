import { ObjectId } from "mongoose";
import { User } from "src/user/schema/user.schema";
import { JoinedRoom } from "./Joinedroom.schema";
import { Message } from "./Message.schema";
export declare type RoomDocument = Room & Document;
export declare class Room {
    _id: ObjectId;
    name: String;
    createAt: Date;
    users: User[];
    message: Message[];
    joinedRoom: JoinedRoom[];
}
export declare const RoomSchema: import("mongoose").Schema<import("mongoose").Document<Room, any, any>, import("mongoose").Model<import("mongoose").Document<Room, any, any>, any, any, any>, any, any>;
