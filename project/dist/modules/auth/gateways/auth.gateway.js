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
var AuthGateway_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const auth_services_1 = require("../services/auth.services");
const http_1 = require("http");
const common_1 = require("@nestjs/common");
const user_service_1 = require("../../user/services/user.service");
let AuthGateway = AuthGateway_1 = class AuthGateway {
    constructor(service, userService) {
        this.service = service;
        this.userService = userService;
        this.logger = new common_1.Logger(AuthGateway_1.name);
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
    async handleGetProfile(data) {
        const { token } = data;
        if (!token)
            return this.server.emit('profileError', 'token required!');
        try {
            const payload = await this.service.validateToken(token);
            const user = await this.userService.findOne({ id: payload.id });
            if (!user)
                return this.server.emit('profileError', 'User not found');
            this.server.emit('profile', { ...user, password: undefined });
        }
        catch (err) {
            this.logger.error(`(getProfile) handle error: ${err.message}`);
            this.server.emit('profileError', err.message);
        }
    }
    async handleLogIn(data) {
        if (!data.username)
            return this.server.emit('logInError', 'username required!');
        if (!data.password)
            return this.server.emit('logInError', 'password required!');
        try {
            const token = await this.service.logIn(data);
            this.server.emit('jwtToken', token);
        }
        catch (err) {
            this.logger.error(`(logInError) handle error: ${err.message}`);
            this.server.emit('logInError', err.message);
        }
    }
    async handleSignIn(data) {
        if (!data.username)
            return this.server.emit('logInError', 'username required!');
        if (!data.password)
            return this.server.emit('logInError', 'password required!');
        if (!data.email)
            return this.server.emit('logInError', 'email required!');
        try {
            const token = await this.service.signIn(data);
            this.server.emit('jwtToken', token);
        }
        catch (err) {
            this.logger.error(`(signInError) handle error: ${err.message}`);
            this.server.emit('signInError', err.message);
        }
    }
};
exports.AuthGateway = AuthGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", http_1.Server)
], AuthGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('getProfile'),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthGateway.prototype, "handleGetProfile", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('logIn'),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthGateway.prototype, "handleLogIn", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('signIn'),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthGateway.prototype, "handleSignIn", null);
exports.AuthGateway = AuthGateway = AuthGateway_1 = __decorate([
    (0, websockets_1.WebSocketGateway)(8020, {
        namespace: '/ws/auth',
        cors: {
            origin: '*',
        },
    }),
    __metadata("design:paramtypes", [auth_services_1.AuthService,
        user_service_1.UserService])
], AuthGateway);
//# sourceMappingURL=auth.gateway.js.map