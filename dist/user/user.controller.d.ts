import { UserService } from './user.service';
import { Response } from 'express';
import { UserDTO } from './dto/user.dto';
import { User } from './schema/user.schema';
export declare class UserController {
    private userservice;
    constructor(userservice: UserService);
    register(response: Response, userdto: UserDTO): Promise<any>;
    login({ username, password }: {
        username: any;
        password: any;
    }): Promise<any>;
    getUser(user: User): Promise<any>;
    refreshtoken(rf: any): Promise<any>;
    forgotPassword({ email }: {
        email: any;
    }): Promise<any>;
    resetPassword({ token, password, password_confirm }: {
        token: any;
        password: any;
        password_confirm: any;
    }): Promise<any>;
    download(res: Response): Promise<any>;
    exportReport(): void;
    importUser(file: any): void;
}
