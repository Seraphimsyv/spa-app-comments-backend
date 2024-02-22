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
var AuthListener_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthListener = void 0;
const common_1 = require("@nestjs/common");
const event_emitter_1 = require("@nestjs/event-emitter");
const auth_event_1 = require("../events/auth.event");
let AuthListener = AuthListener_1 = class AuthListener {
    constructor() {
        this.logger = new common_1.Logger(AuthListener_1.name);
    }
    async handleAuthLoginEvent(event) {
        this.logger.debug(`Auth login event: ${JSON.stringify(event)}`);
    }
    async handleAuthSigninEvent(event) {
        this.logger.debug(`Auth signin event: ${JSON.stringify(event)}`);
    }
};
exports.AuthListener = AuthListener;
__decorate([
    (0, event_emitter_1.OnEvent)('auth.login'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_event_1.AuthLoginEvent]),
    __metadata("design:returntype", Promise)
], AuthListener.prototype, "handleAuthLoginEvent", null);
__decorate([
    (0, event_emitter_1.OnEvent)('auth.signin'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_event_1.AuthSigninEvent]),
    __metadata("design:returntype", Promise)
], AuthListener.prototype, "handleAuthSigninEvent", null);
exports.AuthListener = AuthListener = AuthListener_1 = __decorate([
    (0, common_1.Injectable)()
], AuthListener);
//# sourceMappingURL=auth.listener.js.map