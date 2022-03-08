"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bootstrap = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const dotenv = require("dotenv");
const logger_service_1 = require("./logger/logger.service");
const exception_1 = require("./utils/exception");
const cookieParser = require("cookie-parser");
dotenv.config();
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.use(cookieParser());
    app.setGlobalPrefix('api/v1');
    const options = {
        origin: "*",
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        preflightContinue: false,
        optionsSuccessStatus: 204,
        credentials: true,
    };
    app.enableCors(options);
    app.useGlobalPipes(new common_1.ValidationPipe());
    app.setViewEngine('hbs');
    const loggerservice = new logger_service_1.LoggerService();
    app.useGlobalFilters(new exception_1.AllExceptionsFilter(loggerservice));
    await app.listen(3000, "0.0.0.0");
}
exports.bootstrap = bootstrap;
bootstrap();
//# sourceMappingURL=main.js.map