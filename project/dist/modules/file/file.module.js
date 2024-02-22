"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileModule = void 0;
const common_1 = require("@nestjs/common");
const file_service_1 = require("./services/file.service");
const file_queue_service_1 = require("./services/file-queue.service");
const bull_1 = require("@nestjs/bull");
const file_processor_1 = require("./processors/file.processor");
const file_listener_1 = require("./listeners/file.listener");
let FileModule = class FileModule {
};
exports.FileModule = FileModule;
exports.FileModule = FileModule = __decorate([
    (0, common_1.Module)({
        imports: [bull_1.BullModule.registerQueueAsync({ name: 'file' })],
        providers: [file_service_1.FileService, file_queue_service_1.FileQueueService, file_processor_1.FileProcessor, file_listener_1.FileListener],
        exports: [file_service_1.FileService, file_queue_service_1.FileQueueService],
    })
], FileModule);
//# sourceMappingURL=file.module.js.map