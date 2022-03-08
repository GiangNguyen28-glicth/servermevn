import { Model } from 'mongoose';
import { MessageRecipientDTO } from './dto/MessageRecipient.dto';
import { MessageRecipientDocument } from './schema/MessageRecipient.schema';
export declare class MessageRecipientService {
    private userConversationModel;
    constructor(userConversationModel: Model<MessageRecipientDocument>);
    findAll(): Promise<any>;
    create(inputs: MessageRecipientDTO): Promise<any>;
    deleteById(_id: any): Promise<any>;
}
