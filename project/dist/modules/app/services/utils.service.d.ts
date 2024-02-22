import { Captcha } from 'src/common/types';
import { Response } from 'express';
export declare class UtilsService {
    private readonly logger;
    serveFile(res: Response, dir: string, filename: string): Promise<Response>;
    generateCaptcha(): Promise<Captcha>;
}
