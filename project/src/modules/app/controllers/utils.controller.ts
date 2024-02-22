import { Controller, Get, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { UtilsService } from '../services/utils.service';

@Controller('utils')
export class UtilsController {
  constructor(private readonly service: UtilsService) {}
  /**
   *
   * @param dir
   * @param filename
   * @param res
   * @returns
   */
  @Get('/get/file/:dir/:filename')
  async getFile(
    @Param('dir') dir: string,
    @Param('filename') filename: string,
    @Res() res: Response,
  ) {
    return await this.service.serveFile(res, dir, filename);
  }
  /**
   *
   * @returns
   */
  @Get('/get/captcha')
  async getCaptcha() {
    return await this.service.generateCaptcha();
  }
}
