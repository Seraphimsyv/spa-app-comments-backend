import { PipeTransform } from '@nestjs/common';
export declare class FileValidationPipe implements PipeTransform {
    transform(value: any): Promise<any>;
}
