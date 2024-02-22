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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UtilsController = void 0;
const common_1 = require("@nestjs/common");
const utils_service_1 = require("../services/utils.service");
let UtilsController = class UtilsController {
    constructor(service) {
        this.service = service;
    }
    async getFile(dir, filename, res) {
        return await this.service.serveFile(res, dir, filename);
    }
    async getCaptcha() {
        return await this.service.generateCaptcha();
    }
};
exports.UtilsController = UtilsController;
__decorate([
    (0, common_1.Get)('/get/file/:dir/:filename'),
    __param(0, (0, common_1.Param)('dir')),
    __param(1, (0, common_1.Param)('filename')),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], UtilsController.prototype, "getFile", null);
__decorate([
    (0, common_1.Get)('/get/captcha'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UtilsController.prototype, "getCaptcha", null);
exports.UtilsController = UtilsController = __decorate([
    (0, common_1.Controller)('utils'),
    __metadata("design:paramtypes", [utils_service_1.UtilsService])
], UtilsController);
//# sourceMappingURL=utils.controller.js.map