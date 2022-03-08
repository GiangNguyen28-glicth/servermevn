import { ObjectId } from "mongoose";
export declare type UserDocument = User & Document;
export declare class User {
    _id: ObjectId;
    username: string;
    password: string;
    email: string;
    role: string;
    isEmailConfirmed?: boolean;
    isExprise?: Date;
}
export declare const UserSchema: import("mongoose").Schema<import("mongoose").Document<User, any, any>, import("mongoose").Model<import("mongoose").Document<User, any, any>, any, any, any>, any, any>;
