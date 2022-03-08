import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    HttpStatus,
  } from '@nestjs/common';
  import { HttpArgumentsHost } from '@nestjs/common/interfaces';
  import { LoggerService } from 'src/logger/logger.service';
  @Catch()
  export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private logger: LoggerService){}
  catch(exception: HttpException | Error, host: ArgumentsHost): void {
    const ctx: HttpArgumentsHost = host.switchToHttp()
    // Handling error message and logging
    this.handleMessage(exception)
    // Response to client
    AllExceptionsFilter.handleResponse(exception,host)
  }
  
  private handleMessage(exception: unknown): void {
    let message = 'Internal Server Error'
    if (exception instanceof HttpException) {
      message = JSON.stringify(exception.getResponse())
    } else if (exception instanceof Error) {
      message = exception.stack.toString()
    }
    this.logger.error(message)
  }
  
  private static handleResponse(exception: HttpException | Error,host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    let status = (exception instanceof HttpException) ? exception.getStatus(): HttpStatus.INTERNAL_SERVER_ERROR;
    response
    .status(status)
    .json({
      statusCode: status,
      message:exception.message,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
    }
  }