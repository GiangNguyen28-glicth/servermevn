import { ObjectId } from "mongoose";
export declare class UserConversationDTO {
    _id: ObjectId;
    userId: ObjectId;
    conversationId: ObjectId;
    last_message_id: number | null;
}
export interface UpdateLastMessage {
    userId: ObjectId;
    conversationId: ObjectId;
    message_id: number;
}
