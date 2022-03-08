export enum UserRole{
    ADMIN="admin",
    USER="user"
}
export type Tokens = {
    access_token: string;
    refresh_token: string;
};
export enum SendMail {
    REGISTER="register",
    FORGOT_PASSWORD="forgotpassword"
}