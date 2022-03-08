"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const user_module_1 = require("./user/user.module");
const product_module_1 = require("./product/product.module");
const category_module_1 = require("./category/category.module");
const order_module_1 = require("./order/order.module");
const config_1 = require("@nestjs/config");
const mongoose_1 = require("@nestjs/mongoose");
const logger_module_1 = require("./logger/logger.module");
const mail_module_1 = require("./mail/mail.module");
const platform_express_1 = require("@nestjs/platform-express");
const Chat_module_1 = require("./socket/Chat.module");
const location_module_1 = require("./location/location.module");
const cart_module_1 = require("./cart/cart.module");
const paypal_module_1 = require("./paypal/paypal.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [user_module_1.UserModule, product_module_1.ProductModule, category_module_1.CategoryModule, order_module_1.OrderModule, location_module_1.LocationModule,
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            platform_express_1.MulterModule.register({
                dest: './upload'
            }),
            mongoose_1.MongooseModule.forRoot(process.env.DATABASE_URL),
            logger_module_1.LoggerModule,
            mail_module_1.MailModule,
            Chat_module_1.ChatModule,
            cart_module_1.CartModule,
            paypal_module_1.PaypalModule
        ],
        controllers: [],
        providers: [],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map