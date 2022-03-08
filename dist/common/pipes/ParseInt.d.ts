import { PipeTransform } from '@nestjs/common';
export declare class ParseDataToIntPipe implements PipeTransform {
    transform(value: any): number;
}
