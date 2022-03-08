import { HttpException, HttpStatus } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Socket } from "socket.io";
import { UserService } from "src/user/user.service";
import { InformationDTO, TypeInformation } from "./dto/Information.dto";
import { InformationService } from "./Information.service";
import { MessageService } from "./message.service";
@WebSocketGateway({ transport: ['websocket'], allowEIO3: true })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(private jwtservice: JwtService,
    private userservice: UserService,
    private informationservice: InformationService,
    private messageservice: MessageService,) { }
  @WebSocketServer()
  server;
  @SubscribeMessage('message')
  async handleMessage(socket: Socket, { sender, toUser, message }): Promise<any> {
    console.log(sender, toUser, message)
    const userIn = await this.informationservice.findSocketId(sender);
    const messageVal = await this.messageservice.createMessage({ senderId: userIn.userId, receiverId: toUser, message: message });
    const receiverId = await this.informationservice.findbyUserId(toUser);
    await this.server.to(sender).emit("senderMessage",messageVal);
    await this.server.to(receiverId.socketId).emit("privateMessage", messageVal);
  }

  @SubscribeMessage('listmessage')
  async getMessageByUser(socket:Socket,{sender,receiverId}):Promise<any>{
    const userIn = await this.informationservice.findSocketId(sender);
    const messageofUser = await this.messageservice.findMessageByUser(userIn.userId,receiverId);
    await this.server.to(sender).emit("getlistmessage",messageofUser);
  }
  async handleConnection(socket: Socket): Promise<void> {
    try {
      const user = await this.getDataUserFromToken(socket);
      // if (!user) {
      //   this.disconnect(socket);
      // }
      const information: InformationDTO = {
        userId: user._id,
        type: TypeInformation.socket_id,
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
    } catch (e) {
      // console.log(e)
      // this.disconnect(socket);
    }
  }

  handleDisconnect(socket: Socket): void {
    socket.disconnect();
  }
  async disconnect(socket: Socket) {
    console.log(socket.id);
    await this.informationservice.deleteByValue(socket.id);
    console.log("disconnect");
    socket.emit('Error', new HttpException("USER_NOT_FOUD_SOCKET", HttpStatus.NOT_FOUND));
    socket.disconnect();
  }

  async getDataUserFromToken(socket: Socket): Promise<any> {
    const payload = await this.jwtservice.verify(socket.handshake.auth.token, {
      secret: process.env.AT_SECRET,
    });
    const user = await this.userservice.findOneUser(payload._id);
    return user;
  }

}