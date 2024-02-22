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
var UserService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("../entities/user.entity");
const typeorm_2 = require("typeorm");
const event_emitter_1 = require("@nestjs/event-emitter");
const user_event_1 = require("../events/user.event");
let UserService = UserService_1 = class UserService {
    constructor(repository, eventEmitter) {
        this.repository = repository;
        this.eventEmitter = eventEmitter;
        this.logger = new common_1.Logger(UserService_1.name);
    }
    async findOne(where, orderBy) {
        const user = await this.repository.findOne({
            where: where,
            order: orderBy ? orderBy : undefined,
            relations: {
                comments: true,
            },
        });
        if (!user)
            return null;
        return user;
    }
    async findMany(where, orderBy) {
        const users = await this.repository.find({
            where: where,
            order: orderBy ? orderBy : undefined,
            relations: {
                comments: true,
            },
        });
        return users;
    }
    async createOne(createData) {
        const newUser = await this.repository.create(createData);
        const createdUser = await this.repository.save(newUser);
        const userCreatedEvent = new user_event_1.UserCreatedEvent();
        userCreatedEvent.id = createdUser.id;
        userCreatedEvent.username = createdUser.username;
        userCreatedEvent.email = createdUser.email;
        userCreatedEvent.homePage = createdUser.homePage;
        this.eventEmitter.emit('user.created', userCreatedEvent);
        return createdUser;
    }
    async updateOne(where, updateData) {
        const user = await this.findOne(where);
        if (!user)
            throw new common_1.BadRequestException('User not found for update!');
        const updatedUser = await this.repository.save({
            ...user,
            ...updateData,
        });
        return updatedUser;
    }
    async deleteOne(where) {
        const user = await this.findOne(where);
        if (!user)
            throw new common_1.BadRequestException('User not found for delete!');
        await this.repository.delete(user);
        return user;
    }
    async deleteMany(where) {
        const users = await this.findMany(where);
        await this.repository.delete(where);
        return users;
    }
};
exports.UserService = UserService;
exports.UserService = UserService = UserService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        event_emitter_1.EventEmitter2])
], UserService);
//# sourceMappingURL=user.service.js.map