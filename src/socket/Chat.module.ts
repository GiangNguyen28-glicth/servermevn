import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { MongooseModule } from "@nestjs/mongoose";
import { UserModule } from "src/user/user.module";
import { ChatGateway } from "./Chat.gateway";
import { InformationService } from "./Information.service";
import { MessageService } from "./message.service";
import { Information, InformationSchema } from "./schema/Information.schema";
import { Message, MessageSchema } from "./schema/Message.schema";

@Module({
    imports: [UserModule,JwtModule.register({signOptions:{
        expiresIn:3600
    }}),
        MongooseModule.forFeature([{name:Message.name,schema:MessageSchema}]),
        MongooseModule.forFeature([{name:Information.name,schema:InformationSchema}]),
        ],
    providers: [ChatGateway,MessageService,InformationService]
})
export class ChatModule {

}