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
exports.Comment = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../../user/entities/user.entity");
const file_entity_1 = require("../../file/entities/file.entity");
let Comment = class Comment {
};
exports.Comment = Comment;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Comment.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], Comment.prototype, "text", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => file_entity_1.File, { nullable: true }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", file_entity_1.File)
], Comment.prototype, "file", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Comment, (comment) => comment.comments, { nullable: true }),
    __metadata("design:type", Comment)
], Comment.prototype, "parent", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Comment, (comment) => comment.parent),
    __metadata("design:type", Array)
], Comment.prototype, "comments", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (author) => author.comments, { nullable: true }),
    __metadata("design:type", user_entity_1.User)
], Comment.prototype, "author", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'json', nullable: true }),
    __metadata("design:type", Object)
], Comment.prototype, "anonymAuthor", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'timestamp with time zone',
        default: () => 'CURRENT_TIMESTAMP',
    }),
    __metadata("design:type", Date)
], Comment.prototype, "createdAt", void 0);
exports.Comment = Comment = __decorate([
    (0, typeorm_1.Entity)()
], Comment);
//# sourceMappingURL=comment.entity.js.map