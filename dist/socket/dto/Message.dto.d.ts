import { ObjectId } from "mongoose";
export declare class MessageDTO {
    senderId: ObjectId;
    receiverId: ObjectId;
    message: string | null;
}
