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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentDeleteManyDto = exports.CommentDeleteOneDto = exports.CommentUpdateOneDto = exports.CommentCreateOneDto = exports.CommentGetManyDto = void 0;
const class_validator_1 = require("class-validator");
const comment_entity_1 = require("../entities/comment.entity");
const user_entity_1 = require("../../user/entities/user.entity");
class CommentQueryDto {
}
__decorate([
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], CommentQueryDto.prototype, "query", void 0);
class CommentGetManyDto {
}
exports.CommentGetManyDto = CommentGetManyDto;
class CommentCreateOneDto {
}
exports.CommentCreateOneDto = CommentCreateOneDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CommentCreateOneDto.prototype, "text", void 0);
__decorate([
    (0, class_validator_1.IsNumberString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CommentCreateOneDto.prototype, "parent", void 0);
__decorate([
    (0, class_validator_1.IsObject)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", user_entity_1.User)
], CommentCreateOneDto.prototype, "author", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CommentCreateOneDto.prototype, "anonymAuthor", void 0);
class CommentUpdateOneDto extends CommentQueryDto {
}
exports.CommentUpdateOneDto = CommentUpdateOneDto;
__decorate([
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", comment_entity_1.Comment)
], CommentUpdateOneDto.prototype, "updateData", void 0);
class CommentDeleteOneDto extends CommentQueryDto {
}
exports.CommentDeleteOneDto = CommentDeleteOneDto;
class CommentDeleteManyDto extends CommentQueryDto {
}
exports.CommentDeleteManyDto = CommentDeleteManyDto;
//# sourceMappingURL=comment.dto.js.map