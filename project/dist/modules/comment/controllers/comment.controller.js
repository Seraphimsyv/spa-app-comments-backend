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
exports.CommentController = void 0;
const common_1 = require("@nestjs/common");
const comment_service_1 = require("../services/comment.service");
const comment_dto_1 = require("../dto/comment.dto");
const platform_express_1 = require("@nestjs/platform-express");
const fileValidation_pipe_1 = require("../../file/pipes/fileValidation.pipe");
let CommentController = class CommentController {
    constructor(service) {
        this.service = service;
    }
    async getOne(id) {
        return await this.service.findOne({ id });
    }
    async getMany(query = { page: 1, limit: 25 }) {
        return await this.service.findMany(query.page, query.limit);
    }
    async createOne(req, file, dto) {
        if (req.user)
            dto.author = req.user;
        return await this.service.createOne(dto, file);
    }
    async updateOne(dto) {
        const { query, updateData } = dto;
        return await this.service.updateOne(query, updateData);
    }
    async deleteOne(dto) {
        const { query } = dto;
        return await this.service.deleteOne(query);
    }
    async deleteMany(dto) {
        const { query } = dto;
        return await this.service.deleteMany(query);
    }
};
exports.CommentController = CommentController;
__decorate([
    (0, common_1.Get)('/get/one/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CommentController.prototype, "getOne", null);
__decorate([
    (0, common_1.Get)('/get/many'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [comment_dto_1.CommentGetManyDto]),
    __metadata("design:returntype", Promise)
], CommentController.prototype, "getMany", null);
__decorate([
    (0, common_1.Post)('/create/one'),
    (0, common_1.UsePipes)(fileValidation_pipe_1.FileValidationPipe),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.UploadedFile)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, comment_dto_1.CommentCreateOneDto]),
    __metadata("design:returntype", Promise)
], CommentController.prototype, "createOne", null);
__decorate([
    (0, common_1.Put)('/update/one'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [comment_dto_1.CommentUpdateOneDto]),
    __metadata("design:returntype", Promise)
], CommentController.prototype, "updateOne", null);
__decorate([
    (0, common_1.Delete)('/delete/one'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [comment_dto_1.CommentDeleteOneDto]),
    __metadata("design:returntype", Promise)
], CommentController.prototype, "deleteOne", null);
__decorate([
    (0, common_1.Delete)('/delete/many'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [comment_dto_1.CommentDeleteManyDto]),
    __metadata("design:returntype", Promise)
], CommentController.prototype, "deleteMany", null);
exports.CommentController = CommentController = __decorate([
    (0, common_1.Controller)('comment'),
    __metadata("design:paramtypes", [comment_service_1.CommentService])
], CommentController);
//# sourceMappingURL=comment.controller.js.map