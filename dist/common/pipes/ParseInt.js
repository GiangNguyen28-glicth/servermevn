"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParseDataToIntPipe = void 0;
const common_1 = require("@nestjs/common");
class ParseDataToIntPipe {
    transform(value) {
        const transformedValue = parseInt(value, 10);
        if (isNaN(transformedValue)) {
            throw new common_1.BadRequestException('cannot transform input data to number');
        }
        return transformedValue;
    }
    ;
}
exports.ParseDataToIntPipe = ParseDataToIntPipe;
//# sourceMappingURL=ParseInt.js.map