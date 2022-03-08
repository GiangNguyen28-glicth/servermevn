"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatModule = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const mongoose_1 = require("@nestjs/mongoose");
const user_module_1 = require("../user/user.module");
const Chat_gateway_1 = require("./Chat.gateway");
const Information_service_1 = require("./Information.service");
const message_service_1 = require("./message.service");
const Information_schema_1 = require("./schema/Information.schema");
const Message_schema_1 = require("./schema/Message.schema");
let ChatModule = class ChatModule {
};
ChatModule = __decorate([
    (0, common_1.Module)({
        imports: [user_module_1.UserModule, jwt_1.JwtModule.register({ signOptions: {
                    expiresIn: 3600
                } }),
            mongoose_1.MongooseModule.forFeature([{ name: Message_schema_1.Message.name, schema: Message_schema_1.MessageSchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: Information_schema_1.Information.name, schema: Information_schema_1.InformationSchema }]),
        ],
        providers: [Chat_gateway_1.ChatGateway, message_service_1.MessageService, Information_service_1.InformationService]
    })
], ChatModule);
exports.ChatModule = ChatModule;
//# sourceMappingURL=Chat.module.js.map