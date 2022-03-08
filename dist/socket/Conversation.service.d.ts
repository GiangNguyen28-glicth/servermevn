import { Model } from 'mongoose';
import { ConversationDTO } from './dto/Conversation.dto';
import { Conversation, ConversationDocument } from './schema/Conversation.schema';
export declare class ConversationsService {
    private conversationmodel;
    constructor(conversationmodel: Model<ConversationDocument>);
    findAll(relations?: string[]): Promise<any>;
    create(inputs: ConversationDTO): Promise<any>;
    findById(_id: any): Promise<any>;
    update(conversation: Conversation, inputs: ConversationDTO): Promise<any>;
    deleteById(_id: any): Promise<any>;
}
