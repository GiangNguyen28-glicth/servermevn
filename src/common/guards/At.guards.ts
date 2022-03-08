import { ExecutionContext, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class AtGuard extends AuthGuard('jwt') {
    canActivate(context: ExecutionContext) {

        return super.canActivate(context);
    }

    handleRequest(err, user) {
        // You can throw an exception based on either "info" or "err" arguments
        if (err || !user) {
            throw err || new HttpException("ExpiredToken",HttpStatus.UNAUTHORIZED);
        }
        return user;
    }
}