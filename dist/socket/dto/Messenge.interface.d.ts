import { ObjectId } from "mongoose";
import { User } from "src/user/schema/user.schema";
export interface MessagesInterface {
    message: string;
    conversationId: ObjectId;
    userId: ObjectId;
    user: User;
}
