import { Model } from 'mongoose';
import { InformationDTO } from './dto/Information.dto';
import { Information, InformationDocument } from './schema/Information.schema';
export declare class InformationService {
    private informationmodel;
    constructor(informationmodel: Model<InformationDocument>);
    findAll(): Promise<any>;
    findbyUserId(userId: any): Promise<Information>;
    create(inputs: InformationDTO): Promise<any>;
    findById(_id: any): Promise<any>;
    findSocketId(socketId: any): Promise<any>;
    update(Information: Information, inputs: InformationDTO): Promise<any>;
    deleteById(_id: any): Promise<any>;
    deleteByValue(value: string): Promise<any>;
}
