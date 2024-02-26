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
exports.CommentGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const comment_service_1 = require("../services/comment.service");
const utils_1 = require("../../../common/utils");
const auth_services_1 = require("../../auth/services/auth.services");
const abstract_1 = require("../../../common/abstract");
let CommentGateway = class CommentGateway extends abstract_1.AbstractGateway {
    constructor(service, authService) {
        super();
        this.service = service;
        this.authService = authService;
    }
    async handleGetComments(data, client) {
        const { page, limit, orderBy } = data;
        const pageOffset = page ? page : 1;
        const limitCount = limit ? limit : 25;
        const order = orderBy ? orderBy : { column: 'createdAt', sort: 'DESC' };
        const comments = await this.service.findMany(pageOffset, limitCount, {}, order);
        this.proccessData(comments);
        this.server.to(client.id).emit('reciveComments', comments);
    }
    async handleUploadFile(data, client) {
        const { comment, file } = data;
        if (comment.author) {
            const user = await this.authService.validateToken(comment.author);
            if (!user)
                return this.server.to(client.id).emit('jwtError', 'Jwt token expired');
            comment.author = user;
        }
        if (file) {
            const convertedFile = await (0, utils_1.convertFileDataToFileObject)(data.file);
            const fileValid = await (0, utils_1.validationFile)(convertedFile);
            if (fileValid) {
                try {
                    const result = await this.service.createOne(comment, convertedFile);
                    this.server.to(client.id).emit('commentCreated', result);
                }
                catch (err) {
                    this.logger.error('ws create comment with file error: ' + err.message);
                }
            }
        }
        else {
            try {
                const result = await this.service.createOne(comment);
                this.server.to(client.id).emit('commentCreated', result);
            }
            catch (err) {
                this.logger.error('ws create comment error: ' + err.message);
            }
        }
    }
};
exports.CommentGateway = CommentGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], CommentGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('getComments'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], CommentGateway.prototype, "handleGetComments", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('createComment'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], CommentGateway.prototype, "handleUploadFile", null);
exports.CommentGateway = CommentGateway = __decorate([
    (0, websockets_1.WebSocketGateway)(8020, {
        namespace: '/ws/comment',
        cors: {
            origin: '*',
        },
    }),
    __metadata("design:paramtypes", [comment_service_1.CommentService,
        auth_services_1.AuthService])
], CommentGateway);
//# sourceMappingURL=comment.gateway.js.map