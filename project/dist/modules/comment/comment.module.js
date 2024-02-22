"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const comment_entity_1 = require("./entities/comment.entity");
const comment_controller_1 = require("./controllers/comment.controller");
const comment_service_1 = require("./services/comment.service");
const file_module_1 = require("../file/file.module");
const core_1 = require("@nestjs/core");
const query_exceptions_1 = require("../../exceptions/query.exceptions");
const comment_listener_1 = require("./listeners/comment.listener");
const user_module_1 = require("../user/user.module");
const comment_gateway_1 = require("./gateways/comment.gateway");
const auth_module_1 = require("../auth/auth.module");
let CommentModule = class CommentModule {
};
exports.CommentModule = CommentModule;
exports.CommentModule = CommentModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([comment_entity_1.Comment]),
            (0, common_1.forwardRef)(() => user_module_1.UserModule),
            (0, common_1.forwardRef)(() => auth_module_1.AuthModule),
            file_module_1.FileModule,
        ],
        controllers: [comment_controller_1.CommentController],
        providers: [
            comment_service_1.CommentService,
            comment_gateway_1.CommentGateway,
            comment_listener_1.CommentListener,
            {
                provide: core_1.APP_FILTER,
                useClass: query_exceptions_1.CommentQueryFailedException,
            },
        ],
        exports: [comment_service_1.CommentService],
    })
], CommentModule);
//# sourceMappingURL=comment.module.js.map