import { ArgumentMetadata, PipeTransform } from '@nestjs/common';
export declare class XssValidationPipe implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata): any;
}
