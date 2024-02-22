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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var FileQueueService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileQueueService = void 0;
const bull_1 = require("@nestjs/bull");
const common_1 = require("@nestjs/common");
let FileQueueService = FileQueueService_1 = class FileQueueService {
    constructor(fileQueue) {
        this.fileQueue = fileQueue;
        this.logger = new common_1.Logger(FileQueueService_1.name);
    }
    async addSaveFileJob(file) {
        this.logger.log('Add new job: SaveFile');
        return await this.fileQueue.add('save', { file });
    }
};
exports.FileQueueService = FileQueueService;
exports.FileQueueService = FileQueueService = FileQueueService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, bull_1.InjectQueue)('file')),
    __metadata("design:paramtypes", [Object])
], FileQueueService);
//# sourceMappingURL=file-queue.service.js.map