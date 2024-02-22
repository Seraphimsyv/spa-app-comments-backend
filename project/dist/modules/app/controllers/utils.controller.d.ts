import { Response } from 'express';
import { UtilsService } from '../services/utils.service';
export declare class UtilsController {
    private readonly service;
    constructor(service: UtilsService);
    getFile(dir: string, filename: string, res: Response): Promise<Response<any, Record<string, any>>>;
    getCaptcha(): Promise<import("../../../common/types").Captcha>;
}
