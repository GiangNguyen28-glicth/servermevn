import { IsString, Matches } from "class-validator";

export class UserDTO{
    username:string;
    @IsString()
    @Matches(/^(?=.*[a-zA-z\d@$!%*#?&.=])(?=.*\d)(?=.*[@$!%*#?&.=])[A-Za-z\d@$!%*#?&.=]{8,}$/, {
        message: '8 characters including 1 uppercase letter, 1 special character',
    })
    password:string;
    confirmpassword:string;
    email:string;
}