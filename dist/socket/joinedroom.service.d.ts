import { Model } from "mongoose";
import { JoinedRoomDTO } from "./dto/JoinRoom.dto";
import { JoinedRoomDocument } from "./schema/Joinedroom.schema";
export declare class JoinedRoomService {
    private joinedroomModel;
    constructor(joinedroomModel: Model<JoinedRoomDocument>);
    createRoom(joinedroomdto: JoinedRoomDTO): Promise<any>;
    findByUser(userId: any): Promise<any>;
    findByRoom(roomId: any): Promise<any>;
    deleteBySocketId(socketId: string): Promise<any>;
    deleteAll(): Promise<any>;
}
