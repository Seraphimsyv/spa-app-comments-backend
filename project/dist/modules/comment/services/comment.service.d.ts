/// <reference types="multer" />
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Comment } from 'src/modules/comment/entities/comment.entity';
import { FindOptionsWhere, Repository } from 'typeorm';
import { FileQueueService } from '../../file/services/file-queue.service';
import { ICommentCreateData } from '../interfaces/comment.interfaces';
import { UserService } from 'src/modules/user/services/user.service';
import { Cache } from 'cache-manager';
export declare class CommentService {
    private readonly repository;
    private readonly eventEmitter;
    private readonly userService;
    private readonly fileQueueService;
    private readonly cacheManager;
    constructor(repository: Repository<Comment>, eventEmitter: EventEmitter2, userService: UserService, fileQueueService: FileQueueService, cacheManager: Cache);
    private readonly logger;
    private readonly defaultOrderBy;
    findOne(where: FindOptionsWhere<Comment>): Promise<Comment>;
    findMany(page: number, limit: number, where?: FindOptionsWhere<Comment>, orderBy?: {
        column: string;
        sort: string;
    }): Promise<any>;
    private loadCircularChildren;
    createOne(createData: ICommentCreateData, file?: Express.Multer.File): Promise<Comment>;
    updateOne(where: FindOptionsWhere<Comment>, updateData: Comment): Promise<Comment>;
    deleteOne(where: FindOptionsWhere<Comment>): Promise<Comment>;
    deleteMany(where: FindOptionsWhere<Comment>): Promise<Comment[]>;
}
