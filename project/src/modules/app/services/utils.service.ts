import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { Captcha } from 'src/common/types';
import { create } from 'svg-captcha';
import { Response } from 'express';
import * as fs from 'fs';
import { NEST_CONSTANTS } from 'src/common/constant';

@Injectable()
export class UtilsService {
  private readonly logger: Logger = new Logger(UtilsService.name);
  /**
   *
   * @param res
   * @param dir
   * @param filename
   * @returns
   */
  async serveFile(
    res: Response,
    dir: string,
    filename: string,
  ): Promise<Response> {
    try {
      const filePath: string = `${NEST_CONSTANTS.UPLOAD_DIR}/${dir}/${filename}`;

      if (!fs.existsSync(filePath)) {
        return res.status(404).send('File not found!');
      }

      const fileStream = fs.createReadStream(filePath);
      fileStream.pipe(res);
    } catch (error) {
      this.logger.error(`Error serving file: ${error}`);

      throw new InternalServerErrorException(error, 'Error serving file');
    }
  }
  /**
   *
   * @returns
   */
  async generateCaptcha(): Promise<Captcha> {
    const captcha = create();

    return captcha;
  }
}
