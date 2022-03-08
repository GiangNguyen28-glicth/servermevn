import { ObjectId } from "mongoose";
import { User } from "src/user/schema/user.schema";
import { Message } from "./Message.schema";
import { UserConversation } from "./UserConversation.schema";
export declare type ConversationDocument = Conversation & Document;
export declare class Conversation {
    _id: ObjectId;
    title: string;
    description: string;
    userConversation?: UserConversation[];
    message: Message[];
    users: User[];
    createAt: Date;
}
export declare const ConversationSchema: import("mongoose").Schema<import("mongoose").Document<Conversation, any, any>, import("mongoose").Model<import("mongoose").Document<Conversation, any, any>, any, any, any>, any, any>;
