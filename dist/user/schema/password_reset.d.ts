import { ObjectId } from "mongoose";
export declare type PasswordResetDocument = PasswordReset & Document;
export declare class PasswordReset {
    _id: ObjectId;
    email: string;
    token: string;
    isUsed: boolean;
    isExpire: Date;
    createAt: Date;
}
export declare const PasswordResetSchema: import("mongoose").Schema<import("mongoose").Document<PasswordReset, any, any>, import("mongoose").Model<import("mongoose").Document<PasswordReset, any, any>, any, any, any>, any, any>;
