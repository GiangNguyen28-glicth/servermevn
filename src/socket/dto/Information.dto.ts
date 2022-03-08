import { ObjectId } from "mongoose";

export class InformationDTO {
    userId: ObjectId;
    type: TypeInformation | null;
    socketId: string;
  }
  
  export enum TypeInformation {
    'socket_id' = 'socket_id',
    'device_id' = 'device_id',
  }