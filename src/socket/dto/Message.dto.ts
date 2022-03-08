import { ObjectId } from "mongoose";

export class MessageDTO {
  senderId: ObjectId;
  receiverId:ObjectId;
  message: string | null;
}