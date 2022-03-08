import { ExceptionFilter, ArgumentsHost, HttpException } from '@nestjs/common';
import { LoggerService } from 'src/logger/logger.service';
export declare class AllExceptionsFilter implements ExceptionFilter {
    private logger;
    constructor(logger: LoggerService);
    catch(exception: HttpException | Error, host: ArgumentsHost): void;
    private handleMessage;
    private static handleResponse;
}
