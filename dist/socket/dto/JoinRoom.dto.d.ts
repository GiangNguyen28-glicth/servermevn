import { User } from "src/user/schema/user.schema";
import { Room } from "../schema/Room.schema";
export declare class JoinedRoomDTO {
    socketId: string;
    user: User;
    room: Room;
}
