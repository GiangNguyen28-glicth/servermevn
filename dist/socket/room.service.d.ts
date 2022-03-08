import { Model } from "mongoose";
import { UserDTO } from "src/user/dto/user.dto";
import { RoomDTO } from "./dto/Room.dto";
import { RoomDocument } from "./schema/Room.schema";
export declare class RoomService {
    private roommodel;
    constructor(roommodel: Model<RoomDocument>);
    createRoom(room: RoomDTO, creator: UserDTO): Promise<any>;
    getRoom(_id: any): Promise<any>;
    addCreatorToRoom(room: RoomDTO, creator: UserDTO): Promise<any>;
}
