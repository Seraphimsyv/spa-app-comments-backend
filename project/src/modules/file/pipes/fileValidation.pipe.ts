import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import * as mimeTypes from 'mime-types';
import { validationFile } from 'src/common/utils';

@Injectable()
export class FileValidationPipe implements PipeTransform {
  /**
   *
   * @param value
   * @returns
   */
  async transform(value: any) {
    if (value && value.fieldname) {
      const file: Express.Multer.File = value;

      const fileMimeType = file.mimetype
        ? file.mimetype
        : mimeTypes.lookup(file.originalname);

      try {
        const isValid = await validationFile({
          mimetype: fileMimeType,
          size: file.size,
        });

        if (isValid) return value;
      } catch (err) {
        throw new BadRequestException(err.message);
      }
    } else {
      return value;
    }
  }
}
