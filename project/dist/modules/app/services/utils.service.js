"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var UtilsService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UtilsService = void 0;
const common_1 = require("@nestjs/common");
const svg_captcha_1 = require("svg-captcha");
const fs = require("fs");
const constant_1 = require("../../../common/constant");
let UtilsService = UtilsService_1 = class UtilsService {
    constructor() {
        this.logger = new common_1.Logger(UtilsService_1.name);
    }
    async serveFile(res, dir, filename) {
        try {
            const filePath = `${constant_1.NEST_CONSTANTS.UPLOAD_DIR}/${dir}/${filename}`;
            if (!fs.existsSync(filePath)) {
                return res.status(404).send('File not found!');
            }
            if (dir === 'images') {
                const fileStream = fs.createReadStream(filePath);
                fileStream.pipe(res);
            }
            else {
                const fileContent = fs.readFileSync(filePath, 'utf-8');
                return res.status(200).send(fileContent);
            }
        }
        catch (error) {
            this.logger.error(`Error serving file: ${error}`);
            throw new common_1.InternalServerErrorException(error, 'Error serving file');
        }
    }
    async downloadFile(res, dir, filename) {
        try {
            const filePath = `${constant_1.NEST_CONSTANTS.UPLOAD_DIR}/${dir}/${filename}`;
            if (!fs.existsSync(filePath)) {
                return res.status(404).send('File not found!');
            }
            res.setHeader('Content-Disposition', `attachment; filename=${filename}`);
            res.setHeader('Content-Type', 'text/plain');
            res.download(filePath);
        }
        catch (err) {
            console.log(err);
        }
    }
    async generateCaptcha() {
        const captcha = (0, svg_captcha_1.create)();
        return captcha;
    }
};
exports.UtilsService = UtilsService;
exports.UtilsService = UtilsService = UtilsService_1 = __decorate([
    (0, common_1.Injectable)()
], UtilsService);
//# sourceMappingURL=utils.service.js.map