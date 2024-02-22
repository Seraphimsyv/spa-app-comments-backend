"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var FileService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileService = void 0;
const common_1 = require("@nestjs/common");
const fs = require("fs");
const sizeOf = require("image-size");
const mimeTypes = require("mime-types");
const jimp = require("jimp");
const path_1 = require("path");
const constant_1 = require("../../../common/constant");
const event_emitter_1 = require("@nestjs/event-emitter");
const file_event_1 = require("../events/file.event");
let FileService = FileService_1 = class FileService {
    constructor(eventEmitter) {
        this.eventEmitter = eventEmitter;
        this.logger = new common_1.Logger(FileService_1.name);
    }
    async onModuleInit() {
        const foldersToCheck = [
            constant_1.NEST_CONSTANTS.UPLOAD_DIR,
            `${constant_1.NEST_CONSTANTS.UPLOAD_DIR}/images`,
            `${constant_1.NEST_CONSTANTS.UPLOAD_DIR}/text`,
        ];
        for (const folderPath of foldersToCheck) {
            try {
                await fs.promises.access(folderPath, fs.constants.F_OK);
            }
            catch (err) {
                await fs.promises.mkdir(folderPath);
            }
        }
    }
    async checkImageResolution(file) {
        try {
            const fileResolution = sizeOf.imageSize(file.buffer);
            if (fileResolution.height > constant_1.MAX_IMAGE_SIZE_HEIGHT ||
                fileResolution.width > constant_1.MAX_IMAGE_SIZE_WIDTH) {
                return false;
            }
            return true;
        }
        catch (err) {
            this.logger.error(`Check resolution error: ${err.message}`);
            throw new Error(err);
        }
    }
    async resizeImage(file) {
        try {
            const resizeImage = await jimp.read(file.buffer);
            await resizeImage
                .resize(constant_1.MAX_IMAGE_SIZE_WIDTH, constant_1.MAX_IMAGE_SIZE_HEIGHT)
                .quality(100)
                .getBufferAsync(jimp.MIME_JPEG);
            file.buffer = await resizeImage.getBufferAsync(jimp.MIME_JPEG);
            return file;
        }
        catch (err) {
            this.logger.error(`Resise image error: ${err.message}`);
            throw new Error(err);
        }
    }
    async saveFile(fileData) {
        let file = fileData;
        if (file.buffer instanceof Buffer === false)
            file.buffer = Buffer.from(file.buffer);
        let destination;
        const uniqueSuffix = Math.round(Math.random() * 1e9);
        file.originalname = uniqueSuffix + (0, path_1.extname)(file.originalname);
        const fileMimeType = file.mimetype
            ? file.mimetype
            : mimeTypes.lookup(file.originalname);
        if (constant_1.IMAGE_MIME_TYPES.includes(fileMimeType)) {
            destination = 'images';
            const validResolution = await this.checkImageResolution(file);
            if (!validResolution)
                file = await this.resizeImage(file);
        }
        else {
            destination = 'text';
        }
        try {
            await fs.promises.writeFile(`${constant_1.NEST_CONSTANTS.UPLOAD_DIR}/${destination}/${file.originalname}`, file.buffer);
            const fileUploadedEvent = new file_event_1.FileUploadedEvent();
            fileUploadedEvent.filePath = `${constant_1.NEST_CONSTANTS.UPLOAD_DIR}/${destination}/${file.originalname}`;
            fileUploadedEvent.size = file.size;
            this.eventEmitter.emit('file.uploaded', fileUploadedEvent);
            return {
                ...file,
                path: `${constant_1.NEST_CONSTANTS.UPLOAD_DIR}/${destination}/${file.originalname}`,
            };
        }
        catch (err) {
            this.logger.error(`Failed fs write file: ${err.message}`);
            throw new Error(err);
        }
    }
};
exports.FileService = FileService;
exports.FileService = FileService = FileService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [event_emitter_1.EventEmitter2])
], FileService);
//# sourceMappingURL=file.service.js.map