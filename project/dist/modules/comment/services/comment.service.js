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
var CommentService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentService = void 0;
const common_1 = require("@nestjs/common");
const event_emitter_1 = require("@nestjs/event-emitter");
const typeorm_1 = require("@nestjs/typeorm");
const comment_entity_1 = require("../entities/comment.entity");
const typeorm_2 = require("typeorm");
const comment_event_1 = require("../events/comment.event");
const file_queue_service_1 = require("../../file/services/file-queue.service");
const user_service_1 = require("../../user/services/user.service");
const regex_1 = require("../../../common/regex");
const cache_manager_1 = require("@nestjs/cache-manager");
let CommentService = CommentService_1 = class CommentService {
    constructor(repository, eventEmitter, userService, fileQueueService, cacheManager) {
        this.repository = repository;
        this.eventEmitter = eventEmitter;
        this.userService = userService;
        this.fileQueueService = fileQueueService;
        this.cacheManager = cacheManager;
        this.logger = new common_1.Logger(CommentService_1.name);
        this.defaultOrderBy = {
            createdAt: 'DESC',
        };
    }
    async findOne(where) {
        const cacheData = await this.cacheManager.get(`COMMENTS#ONE#${JSON.stringify(where)}`);
        if (cacheData)
            return cacheData;
        const comment = await this.repository.findOne({
            where: { ...where, parent: null },
            relations: {
                author: true,
                comments: true,
                file: true,
            },
        });
        if (!comment)
            return null;
        await this.cacheManager.set(`COMMENTS#ONE#${JSON.stringify(where)}`, comment);
        const newCommentCreateCacheEvent = new comment_event_1.CommentCreateCacheEvent();
        newCommentCreateCacheEvent.key = `COMMENTS#ONE#${JSON.stringify(where)}`;
        this.eventEmitter.emit('comment.create.cache', newCommentCreateCacheEvent);
        return comment;
    }
    async findMany(page, limit, where, orderBy) {
        const cacheData = await this.cacheManager.get(`COMMENTS#MANY#${page}#${limit}#${JSON.stringify(where)}#${JSON.stringify(orderBy)}`);
        if (cacheData)
            return cacheData;
        const queryBuilder = this.repository.createQueryBuilder('comment');
        queryBuilder.leftJoinAndSelect('comment.file', 'file');
        queryBuilder.leftJoinAndSelect('comment.author', 'author');
        queryBuilder.leftJoinAndSelect('comment.comments', 'comments');
        queryBuilder.where('comment.parent IS NULL');
        if (where) {
            Object.keys(where).forEach((key) => {
                queryBuilder.andWhere(`comment.${key} = :${key}`, {
                    [key]: where[key],
                });
            });
        }
        if (orderBy) {
            if (orderBy.sort === 'ASC') {
                if (orderBy.column !== 'username') {
                    queryBuilder.orderBy(`comment.${orderBy.column}`, 'ASC');
                }
            }
            else {
                if (orderBy.column !== 'username') {
                    queryBuilder.orderBy(`comment.${orderBy.column}`, 'DESC');
                }
            }
        }
        else {
            queryBuilder.orderBy('comment.createdAt', 'DESC');
        }
        const comments = await queryBuilder.getMany();
        if (orderBy && orderBy.column === 'username' && orderBy.sort === 'ASC')
            comments.sort((a, b) => {
                const authorA = a.author?.username || a.anonymAuthor.username;
                const authorB = b.author?.username || b.anonymAuthor.username;
                return authorA.localeCompare(authorB);
            });
        else if (orderBy &&
            orderBy.column === 'username' &&
            orderBy.sort === 'DESC')
            comments.sort((a, b) => {
                const authorA = a.author?.username || a.anonymAuthor.username;
                const authorB = b.author?.username || b.anonymAuthor.username;
                return authorB.localeCompare(authorA);
            });
        const data = await (await this.loadCircularChildren(comments)).slice((page - 1) * limit, (page - 1) * limit + 25);
        const total = await this.repository.find();
        const newCacheData = {
            comments: data,
            currentPage: page,
            pages: Math.ceil(total.length / limit),
        };
        await this.cacheManager.set(`COMMENTS#MANY#${page}#${limit}#${JSON.stringify(where)}#${JSON.stringify(orderBy)}`, newCacheData);
        const commentCreateCacheEvent = new comment_event_1.CommentCreateCacheEvent();
        commentCreateCacheEvent.key = `COMMENTS#MANY#${page}#${limit}#${JSON.stringify(where)}#${JSON.stringify(orderBy)}`;
        this.eventEmitter.emit('comment.create.cache', commentCreateCacheEvent);
        return newCacheData;
    }
    async loadCircularChildren(comments) {
        for (const comment of comments) {
            comment.comments = await this.repository
                .createQueryBuilder('comment')
                .where(`comment.parent = ${comment.id}`)
                .leftJoinAndSelect('comment.file', 'file')
                .leftJoinAndSelect('comment.author', 'author')
                .leftJoinAndSelect('comment.comments', 'comments')
                .getMany();
            if (comment.comments.length > 0) {
                comment.comments = await this.loadCircularChildren(comment.comments);
            }
        }
        return comments;
    }
    async createOne(createData, file) {
        const newComment = this.repository.create();
        if (!createData.text) {
            throw new common_1.BadRequestException('Field required: text');
        }
        else {
            newComment.text = createData.text;
        }
        if (createData.parent) {
            const parentId = createData.parent;
            const parentComment = await this.findOne({ id: parentId });
            newComment.parent = parentComment;
        }
        if (createData.author) {
            const user = await this.userService.findOne({ id: createData.author.id });
            if (!user)
                throw new common_1.BadRequestException('User not found!');
            newComment.author = user;
        }
        else {
            if (!createData.anonymAuthor)
                throw new common_1.BadRequestException('Anonym fields required!');
            const anonymAuthor = typeof createData.anonymAuthor === 'string'
                ? JSON.parse(createData.anonymAuthor)
                : createData.anonymAuthor;
            if (!anonymAuthor.username)
                throw new common_1.BadRequestException('Anonym field `username` required!');
            if (!anonymAuthor.email)
                throw new common_1.BadRequestException('Anonym field `email` required!');
            if (!regex_1.EMAIL_REGEX.test(anonymAuthor.email))
                throw new common_1.BadRequestException('Email not valid!');
            newComment.anonymAuthor = anonymAuthor;
        }
        if (file) {
            const job = await this.fileQueueService.addSaveFileJob(file);
            await job
                .finished()
                .then((result) => {
                newComment.file = result.file;
            })
                .catch((err) => {
                throw new common_1.BadRequestException(err.message);
            });
        }
        const savedComment = await this.repository.save(newComment);
        const commentCreatedEvent = new comment_event_1.CommentCreatedEvent();
        commentCreatedEvent.id = savedComment.id;
        commentCreatedEvent.username = newComment.author
            ? newComment.author.username
            : newComment.anonymAuthor.username;
        commentCreatedEvent.isAuth = newComment.author ? true : false;
        this.eventEmitter.emit('comment.created', commentCreatedEvent);
        return savedComment;
    }
    async updateOne(where, updateData) {
        const comment = await this.findOne(where);
        if (!comment)
            throw new common_1.BadRequestException('Comment not found for update!');
        const updatedComment = await this.repository.save({
            ...comment,
            ...updateData,
        });
        return updatedComment;
    }
    async deleteOne(where) {
        const comment = await this.findOne(where);
        if (!comment)
            throw new common_1.BadRequestException('Comment not found for delete!');
        await this.repository.delete(comment);
        return comment;
    }
    async deleteMany(where) {
        const comments = await this.repository.find();
        await this.repository.delete(where);
        return comments;
    }
};
exports.CommentService = CommentService;
exports.CommentService = CommentService = CommentService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(comment_entity_1.Comment)),
    __param(4, (0, common_1.Inject)(cache_manager_1.CACHE_MANAGER)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        event_emitter_1.EventEmitter2,
        user_service_1.UserService,
        file_queue_service_1.FileQueueService, Object])
], CommentService);
//# sourceMappingURL=comment.service.js.map