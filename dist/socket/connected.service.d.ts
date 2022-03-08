import { Model } from "mongoose";
import { ConnectedUserDTO } from "./dto/Connected.dto";
import { ConnectedDocument } from "./schema/Connected.schema";
export declare class ConnectedService {
    private connectedmodel;
    constructor(connectedmodel: Model<ConnectedDocument>);
    create(connectedDto: ConnectedUserDTO): Promise<any>;
    findByUser(userId: any): Promise<any>;
}
