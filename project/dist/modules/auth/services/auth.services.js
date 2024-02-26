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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const event_emitter_1 = require("@nestjs/event-emitter");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcrypt");
const user_service_1 = require("../../user/services/user.service");
const auth_event_1 = require("../events/auth.event");
let AuthService = class AuthService {
    constructor(eventEmitter, userService, jwtService) {
        this.eventEmitter = eventEmitter;
        this.userService = userService;
        this.jwtService = jwtService;
    }
    async logIn(data) {
        const { username, password } = data;
        const user = await this.userService.findOne({ username });
        if (!user)
            throw new common_1.BadRequestException('User not found!');
        const isCompare = await this.validatePassword(password, user.password);
        if (!isCompare)
            throw new common_1.UnauthorizedException();
        console.log(user);
        const payload = { ...user, password: undefined };
        const token = await this.generatePayloadToken(payload);
        const authLoginEvent = new auth_event_1.AuthLoginEvent();
        authLoginEvent.username = user.username;
        authLoginEvent.dateAt = new Date();
        this.eventEmitter.emit('auth.login', authLoginEvent);
        return { access_token: token };
    }
    async signIn(data) {
        const checkUsername = await this.userService.findOne({
            username: data.username,
        });
        if (checkUsername)
            throw new common_1.BadRequestException('User aleady exists with username: ' + data.username);
        const checkEmail = await this.userService.findOne({ email: data.email });
        if (checkEmail)
            throw new common_1.BadRequestException('User already exists with email: ' + data.email);
        const newUser = await this.userService.createOne({
            ...data,
            password: await this.hashingPassword(data.password),
        });
        const userRegisteredEvent = new auth_event_1.AuthSigninEvent();
        userRegisteredEvent.id = newUser.id;
        userRegisteredEvent.username = newUser.username;
        userRegisteredEvent.email = newUser.email;
        userRegisteredEvent.homePage = newUser.homePage;
        this.eventEmitter.emit('auth.signin', userRegisteredEvent);
        const token = await this.generatePayloadToken({
            ...newUser,
            password: undefined,
        });
        return { access_token: token };
    }
    async generatePayloadToken(payload) {
        return await this.jwtService.signAsync(payload);
    }
    async validateToken(token) {
        return await this.jwtService.verifyAsync(token);
    }
    async hashingPassword(plainText, salt = 10) {
        return await bcrypt.hash(plainText, salt);
    }
    async validatePassword(enteredPwd, hashPwd) {
        return await bcrypt.compare(enteredPwd, hashPwd);
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [event_emitter_1.EventEmitter2,
        user_service_1.UserService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.services.js.map