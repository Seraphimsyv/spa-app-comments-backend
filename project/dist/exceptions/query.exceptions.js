"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var UserQueryFailedException_1, CommentQueryFailedException_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentQueryFailedException = exports.UserQueryFailedException = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
let UserQueryFailedException = UserQueryFailedException_1 = class UserQueryFailedException {
    constructor() {
        this.logger = new common_1.Logger(UserQueryFailedException_1.name);
    }
    catch(exception, host) {
        const context = host.switchToHttp();
        const response = context.getResponse();
        this.logger.error(exception.message);
        console.log(exception);
        response.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).json({
            message: 'Error executing to user database table query!',
            errorCode: 'USER_QUERY_FAILED',
        });
    }
};
exports.UserQueryFailedException = UserQueryFailedException;
exports.UserQueryFailedException = UserQueryFailedException = UserQueryFailedException_1 = __decorate([
    (0, common_1.Catch)(typeorm_1.QueryFailedError)
], UserQueryFailedException);
let CommentQueryFailedException = CommentQueryFailedException_1 = class CommentQueryFailedException {
    constructor() {
        this.logger = new common_1.Logger(CommentQueryFailedException_1.name);
    }
    catch(exception, host) {
        const context = host.switchToHttp();
        const response = context.getResponse();
        this.logger.error(exception.message);
        console.log(exception);
        response.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).json({
            message: 'Error executing to comment database table query!',
            errorCode: 'COMMENT_QUERY_FAILED',
        });
    }
};
exports.CommentQueryFailedException = CommentQueryFailedException;
exports.CommentQueryFailedException = CommentQueryFailedException = CommentQueryFailedException_1 = __decorate([
    (0, common_1.Catch)(typeorm_1.QueryFailedError)
], CommentQueryFailedException);
//# sourceMappingURL=query.exceptions.js.map