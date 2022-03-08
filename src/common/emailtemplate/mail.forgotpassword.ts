export class MailForgotpassword{
    static link="";
    static token="";
    public static HTMLLink():any{
        const html=`"
            <h2>HelloWorld ${this.token}</h2>
        "`;
        return html;
    }
}