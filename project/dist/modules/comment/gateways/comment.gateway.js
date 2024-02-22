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
var CommentGateway_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentGateway = void 0;
const common_1 = require("@nestjs/common");
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const comment_service_1 = require("../services/comment.service");
const utils_1 = require("../../../common/utils");
let CommentGateway = CommentGateway_1 = class CommentGateway {
    constructor(service) {
        this.service = service;
        this.logger = new common_1.Logger(CommentGateway_1.name);
    }
    afterInit() {
        this.logger.log('WebSocket server started!');
    }
    handleConnection(client) {
        this.logger.log(`Client with id: ${client.id} connected!`);
    }
    handleDisconnect(client) {
        this.logger.log(`Client with id: ${client.id} disconnected!`);
    }
    async handleGetComments(data) {
        const { page, limit } = data;
        const pageOffset = page ? page : 1;
        const limitCount = limit ? limit : 25;
        const comments = await this.service.findMany(pageOffset, limitCount);
        this.server.emit('sendComments', comments);
    }
    async handleUploadFile(data) {
        const { comment, file } = data;
        if (file) {
            const convertedFile = await (0, utils_1.convertFileDataToFileObject)(data.file);
            const fileValid = await (0, utils_1.validationFile)(convertedFile);
            if (fileValid) {
                try {
                    const result = await this.service.createOne(comment, convertedFile);
                    this.server.emit('commentCreated', result);
                }
                catch (err) {
                    this.logger.error('ws create comment with file error: ' + err.message);
                }
            }
        }
        else {
            try {
                const result = await this.service.createOne(comment);
                this.server.emit('commentCreated', result);
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
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CommentGateway.prototype, "handleGetComments", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('createComment'),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CommentGateway.prototype, "handleUploadFile", null);
exports.CommentGateway = CommentGateway = CommentGateway_1 = __decorate([
    (0, websockets_1.WebSocketGateway)(8010, {
        namespace: '/ws/comment',
        cors: {
            origin: '*',
        },
    }),
    __metadata("design:paramtypes", [comment_service_1.CommentService])
], CommentGateway);
//# sourceMappingURL=comment.gateway.js.map