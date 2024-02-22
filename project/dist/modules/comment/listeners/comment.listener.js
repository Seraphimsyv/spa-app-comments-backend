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
var CommentListener_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentListener = void 0;
const common_1 = require("@nestjs/common");
const event_emitter_1 = require("@nestjs/event-emitter");
const comment_event_1 = require("../events/comment.event");
let CommentListener = CommentListener_1 = class CommentListener {
    constructor() {
        this.logger = new common_1.Logger(CommentListener_1.name);
    }
    async handleCommentCreatedEvent(event) {
        this.logger.debug(`Comment created event: ${JSON.stringify(event)}`);
    }
};
exports.CommentListener = CommentListener;
__decorate([
    (0, event_emitter_1.OnEvent)('comment.created'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [comment_event_1.CommentCreatedEvent]),
    __metadata("design:returntype", Promise)
], CommentListener.prototype, "handleCommentCreatedEvent", null);
exports.CommentListener = CommentListener = CommentListener_1 = __decorate([
    (0, common_1.Injectable)()
], CommentListener);
//# sourceMappingURL=comment.listener.js.map