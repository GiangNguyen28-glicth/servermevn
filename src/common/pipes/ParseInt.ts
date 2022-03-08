import { PipeTransform, BadRequestException } from '@nestjs/common';

export class ParseDataToIntPipe implements PipeTransform {
    transform(value: any): number {
        const transformedValue = parseInt(value, 10)
        if (isNaN(transformedValue)) {
            throw new BadRequestException('cannot transform input data to number')
        }
        return transformedValue
    };
}