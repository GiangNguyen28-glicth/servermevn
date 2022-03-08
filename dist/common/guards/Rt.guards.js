"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RtGuard = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
class RtGuard extends (0, passport_1.AuthGuard)('jwt-refresh') {
    canActivate(context) {
        return super.canActivate(context);
    }
    handleRequest(err, user) {
        if (err || !user) {
            throw err || new common_1.HttpException("Warning Refresh Token", common_1.HttpStatus.UNAUTHORIZED);
        }
        return user;
    }
}
exports.RtGuard = RtGuard;
//# sourceMappingURL=Rt.guards.js.map