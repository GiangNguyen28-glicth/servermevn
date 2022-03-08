import { JwtService } from "@nestjs/jwt";
import { OnGatewayConnection, OnGatewayDisconnect } from "@nestjs/websockets";
import { Socket } from "socket.io";
import { UserService } from "src/user/user.service";
import { InformationService } from "./Information.service";
import { MessageService } from "./message.service";
export declare class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
    private jwtservice;
    private userservice;
    private informationservice;
    private messageservice;
    constructor(jwtservice: JwtService, userservice: UserService, informationservice: InformationService, messageservice: MessageService);
    server: any;
    handleMessage(socket: Socket, { sender, toUser, message }: {
        sender: any;
        toUser: any;
        message: any;
    }): Promise<any>;
    getMessageByUser(socket: Socket, { sender, receiverId }: {
        sender: any;
        receiverId: any;
    }): Promise<any>;
    handleConnection(socket: Socket): Promise<void>;
    handleDisconnect(socket: Socket): void;
    disconnect(socket: Socket): Promise<void>;
    getDataUserFromToken(socket: Socket): Promise<any>;
}
