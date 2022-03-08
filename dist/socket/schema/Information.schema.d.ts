import * as mongoose from "mongoose";
import { ObjectId } from "mongoose";
import { User } from "src/user/schema/user.schema";
import { TypeInformation } from "../dto/Information.dto";
export declare type InformationDocument = Information & Document;
export declare class Information {
    _id: String;
    userId: ObjectId;
    socketId: string;
    type: TypeInformation;
    user: User;
}
export declare const InformationSchema: mongoose.Schema<mongoose.Document<Information, any, any>, mongoose.Model<mongoose.Document<Information, any, any>, any, any, any>, any, any>;
