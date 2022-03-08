import { Model } from 'mongoose';
import { UserDocument } from '../schema/user.schema';
declare const AtStrategy_base: new (...args: any[]) => any;
export declare class AtStrategy extends AtStrategy_base {
    private usermodel;
    constructor(usermodel: Model<UserDocument>);
    validate(payload: any): Promise<any>;
}
export {};
