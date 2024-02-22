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
var FileListener_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileListener = void 0;
const common_1 = require("@nestjs/common");
const event_emitter_1 = require("@nestjs/event-emitter");
const file_event_1 = require("../events/file.event");
let FileListener = FileListener_1 = class FileListener {
    constructor() {
        this.logger = new common_1.Logger(FileListener_1.name);
    }
    async handleFileUploaded(event) {
        this.logger.debug(`File uploaded event: ${JSON.stringify(event)}`);
    }
};
exports.FileListener = FileListener;
__decorate([
    (0, event_emitter_1.OnEvent)('file.uploaded'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [file_event_1.FileUploadedEvent]),
    __metadata("design:returntype", Promise)
], FileListener.prototype, "handleFileUploaded", null);
exports.FileListener = FileListener = FileListener_1 = __decorate([
    (0, common_1.Injectable)()
], FileListener);
//# sourceMappingURL=file.listener.js.map