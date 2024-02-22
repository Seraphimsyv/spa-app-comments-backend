/// <reference types="multer" />
import { OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Comment } from 'src/modules/comment/entities/comment.entity';
import { FindOptionsOrder, FindOptionsWhere, Repository } from 'typeorm';
import { FileQueueService } from '../../file/services/file-queue.service';
import { ICommentCreateData } from '../interfaces/comment.interfaces';
import { UserService } from 'src/modules/user/services/user.service';
export declare class CommentService implements OnModuleInit, OnModuleDestroy {
    private readonly repository;
    private readonly eventEmitter;
    private readonly userService;
    private readonly fileQueueService;
    constructor(repository: Repository<Comment>, eventEmitter: EventEmitter2, userService: UserService, fileQueueService: FileQueueService);
    private readonly logger;
    private readonly defaultOrderBy;
    onModuleInit(): Promise<void>;
    onModuleDestroy(): Promise<void>;
    findOne(where: FindOptionsWhere<Comment>, orderBy?: FindOptionsOrder<Comment>): Promise<Comment>;
    findMany(page: number, limit: number, where?: FindOptionsWhere<Comment>, orderBy?: FindOptionsOrder<Comment>): Promise<Comment[]>;
    createOne(createData: ICommentCreateData, file?: Express.Multer.File): Promise<Comment>;
    updateOne(where: FindOptionsWhere<Comment>, updateData: Comment): Promise<Comment>;
    deleteOne(where: FindOptionsWhere<Comment>): Promise<Comment>;
    deleteMany(where: FindOptionsWhere<Comment>): Promise<Comment[]>;
}
