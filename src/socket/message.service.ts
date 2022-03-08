import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { MessageDTO } from "./dto/Message.dto";
import { Message, MessageDocument } from "./schema/Message.schema";

@Injectable()
export class MessageService {
    constructor(
        @InjectModel(Message.name) private messagemodel:Model<MessageDocument>
    ) {}
    async findAll():Promise<any>{
        return await this.messagemodel.find();
    }
    async createMessage(inputs:MessageDTO):Promise<any>{
        return await this.messagemodel.create(inputs);
    }
    async deleteMessage(_id):Promise<any>{
        return await this.messagemodel.findOneAndDelete({_id:_id});
    }

    async findMessageByUser(receiverId,senderId):Promise<any>{
        const  messofReceiver= await this.messagemodel.find({senderId,receiverId});
        const messofSender = await this.messagemodel.find({senderId:receiverId,receiverId:senderId});
        return {
            messofReceiver:messofReceiver,
            messofSender:messofSender
        }
    }
}