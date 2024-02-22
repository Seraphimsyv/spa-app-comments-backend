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
var FileProcessor_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileProcessor = void 0;
const bull_1 = require("@nestjs/bull");
const file_service_1 = require("../services/file.service");
const common_1 = require("@nestjs/common");
let FileProcessor = FileProcessor_1 = class FileProcessor {
    constructor(fileService) {
        this.fileService = fileService;
        this.logger = new common_1.Logger(FileProcessor_1.name);
    }
    async saveFile(job) {
        const file = await this.fileService.saveFile(job.data.file);
        try {
            return { filePath: file.path };
        }
        catch (err) {
            this.logger.warn('Invalid result');
        }
    }
    onActive(job) {
        this.logger.log(`Processing job #${job.id} of type ${job.name}...`);
    }
    onCompletedSave(job) {
        this.logger.log(`(Complete) on complete: job #${job.id} -> result: file saved successfully!`);
    }
    onError(job) {
        this.logger.error(`Error with job: #${job.id} - ${job.failedReason}`);
    }
    onFailed(job) {
        this.logger.warn(`Failed job: #${job.id} - ${job.failedReason}`);
    }
};
exports.FileProcessor = FileProcessor;
__decorate([
    (0, bull_1.Process)('save'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FileProcessor.prototype, "saveFile", null);
__decorate([
    (0, bull_1.OnQueueActive)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], FileProcessor.prototype, "onActive", null);
__decorate([
    (0, bull_1.OnQueueCompleted)({ name: 'save' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], FileProcessor.prototype, "onCompletedSave", null);
__decorate([
    (0, bull_1.OnQueueError)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], FileProcessor.prototype, "onError", null);
__decorate([
    (0, bull_1.OnQueueFailed)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], FileProcessor.prototype, "onFailed", null);
exports.FileProcessor = FileProcessor = FileProcessor_1 = __decorate([
    (0, bull_1.Processor)('file'),
    __metadata("design:paramtypes", [file_service_1.FileService])
], FileProcessor);
//# sourceMappingURL=file.processor.js.map