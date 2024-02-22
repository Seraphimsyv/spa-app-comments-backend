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
var UserListener_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserListener = void 0;
const common_1 = require("@nestjs/common");
const event_emitter_1 = require("@nestjs/event-emitter");
const user_event_1 = require("../events/user.event");
let UserListener = UserListener_1 = class UserListener {
    constructor() {
        this.logger = new common_1.Logger(UserListener_1.name);
    }
    async handleUserCreatedEvent(event) {
        this.logger.debug(`User created event: ${JSON.stringify(event)}`);
    }
};
exports.UserListener = UserListener;
__decorate([
    (0, event_emitter_1.OnEvent)('user.created'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_event_1.UserCreatedEvent]),
    __metadata("design:returntype", Promise)
], UserListener.prototype, "handleUserCreatedEvent", null);
exports.UserListener = UserListener = UserListener_1 = __decorate([
    (0, common_1.Injectable)()
], UserListener);
//# sourceMappingURL=user.listener.js.map