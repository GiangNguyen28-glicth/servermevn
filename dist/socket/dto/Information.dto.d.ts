import { ObjectId } from "mongoose";
export declare class InformationDTO {
    userId: ObjectId;
    type: TypeInformation | null;
    socketId: string;
}
export declare enum TypeInformation {
    'socket_id' = "socket_id",
    'device_id' = "device_id"
}
