import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { HTML_REGEX } from 'src/common/regex';

@Injectable()
export class XssValidationPipe implements PipeTransform {
  /**
   *
   * @param value
   * @param metadata
   * @returns
   */
  transform(value: any, metadata: ArgumentMetadata) {
    function circularCheckout(data: object) {
      for (const key in data) {
        if (Object.hasOwnProperty.call(data, key)) {
          if (typeof data[key] === 'object') {
            return circularCheckout(data[key]);
          } else if (typeof data[key] === 'string') {
            if (!HTML_REGEX.test(data[key])) {
              throw new BadRequestException('[XSS] Invalid validation');
            }
          }
        }
      }
    }

    if (metadata.type === 'body') {
      circularCheckout(value);
    }

    return value;
  }
}
