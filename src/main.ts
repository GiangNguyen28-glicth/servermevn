import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { NestExpressApplication } from '@nestjs/platform-express';
import { LoggerService } from './logger/logger.service';
import { AllExceptionsFilter } from './utils/exception';
import * as cookieParser from 'cookie-parser';
dotenv.config();
export async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.use(cookieParser());
  app.setGlobalPrefix('api/v1');
  const options = {
    origin: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials:true,
  }
  app.enableCors(options)
  app.useGlobalPipes(new ValidationPipe());
  app.setViewEngine('hbs');
  const loggerservice=new LoggerService();
  app.useGlobalFilters(new AllExceptionsFilter(loggerservice))
  await app.listen(3000,"0.0.0.0");
}
bootstrap();
