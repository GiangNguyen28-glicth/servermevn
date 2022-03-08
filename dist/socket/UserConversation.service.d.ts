import { Model } from 'mongoose';
import { UserConversationDTO } from './dto/UserConversation.dto';
import { UserConversation, UserConversationDocument } from './schema/UserConversation.schema';
export declare class UserConversationService {
    private userConversationModel;
    constructor(userConversationModel: Model<UserConversationDocument>);
    findAll(): Promise<any>;
    create(inputs: UserConversation): Promise<any>;
    findById(_id: any): Promise<any>;
    update(userConversation: UserConversation, inputs: UserConversationDTO): Promise<any>;
    findDataUserConversation(userId: any, conversationId: any): Promise<any>;
    updateLastMessageId(userConversation: UserConversation, last_message_id: number): Promise<any>;
    deleteById(_id: any): Promise<any>;
}
