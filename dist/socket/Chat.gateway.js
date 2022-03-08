"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatGateway = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const user_service_1 = require("../user/user.service");
const Information_dto_1 = require("./dto/Information.dto");
const Information_service_1 = require("./Information.service");
const message_service_1 = require("./message.service");
let ChatGateway = class ChatGateway {
    constructor(jwtservice, userservice, informationservice, messageservice) {
        this.jwtservice = jwtservice;
        this.userservice = userservice;
        this.informationservice = informationservice;
        this.messageservice = messageservice;
    }
    async handleMessage(socket, { sender, toUser, message }) {
        console.log(sender, toUser, message);
        const userIn = await this.informationservice.findSocketId(sender);
        const messageVal = await this.messageservice.createMessage({ senderId: userIn.userId, receiverId: toUser, message: message });
        const receiverId = await this.informationservice.findbyUserId(toUser);
        await this.server.to(sender).emit("senderMessage", messageVal);
        await this.server.to(receiverId.socketId).emit("privateMessage", messageVal);
    }
    async getMessageByUser(socket, { sender, receiverId }) {
        const userIn = await this.informationservice.findSocketId(sender);
        const messageofUser = await this.messageservice.findMessageByUser(userIn.userId, receiverId);
        await this.server.to(sender).emit("getlistmessage", messageofUser);
    }
    async handleConnection(socket) {
        try {
            const user = await this.getDataUserFromToken(socket);
            const information = {
                userId: user._id,
                type: Information_dto_1.TypeInformation.socket_id,
                socketId: socket.id,
            };
            await this.informationservice.create(information);
            const data = await this.informationservice.findAll();
            const users = [];
            for (let index = 0; index < data.length; index++) {
                const userIn = await this.userservice.findOneUser(data[index].userId);
                userIn.password = null;
                users.push(userIn);
            }
            socket.emit("users", users);
            socket.broadcast.emit("usersconnected", users);
        }
        catch (e) {
        }
    }
    handleDisconnect(socket) {
        socket.disconnect();
    }
    async disconnect(socket) {
        console.log(socket.id);
        await this.informationservice.deleteByValue(socket.id);
        console.log("disconnect");
        socket.emit('Error', new common_1.HttpException("USER_NOT_FOUD_SOCKET", common_1.HttpStatus.NOT_FOUND));
        socket.disconnect();
    }
    async getDataUserFromToken(socket) {
        const payload = await this.jwtservice.verify(socket.handshake.auth.token, {
            secret: process.env.AT_SECRET,
        });
        const user = await this.userservice.findOneUser(payload._id);
        return user;
    }
};
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", Object)
], ChatGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('message'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "handleMessage", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('listmessage'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "getMessageByUser", null);
ChatGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({ transport: ['websocket'], allowEIO3: true }),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        user_service_1.UserService,
        Information_service_1.InformationService,
        message_service_1.MessageService])
], ChatGateway);
exports.ChatGateway = ChatGateway;
//# sourceMappingURL=Chat.gateway.js.map