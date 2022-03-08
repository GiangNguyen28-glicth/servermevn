import { Model } from "mongoose";
import { MessageDTO } from "./dto/Message.dto";
import { MessageDocument } from "./schema/Message.schema";
export declare class MessageService {
    private messagemodel;
    constructor(messagemodel: Model<MessageDocument>);
    findAll(): Promise<any>;
    createMessage(inputs: MessageDTO): Promise<any>;
    deleteMessage(_id: any): Promise<any>;
    findMessageByUser(receiverId: any, senderId: any): Promise<any>;
}
