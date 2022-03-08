import { UserDTO } from "src/user/dto/user.dto";
export interface ConnectedUserDTO {
    socketId: string;
    user: UserDTO;
}
