/// <reference types="multer" />
import { CommentService } from '../services/comment.service';
import { CommentCreateOneDto, CommentDeleteManyDto, CommentDeleteOneDto, CommentGetManyDto, CommentUpdateOneDto } from 'src/modules/comment/dto/comment.dto';
export declare class CommentController {
    private readonly service;
    constructor(service: CommentService);
    getOne(id: number): Promise<import("../entities/comment.entity").Comment>;
    getMany(query?: CommentGetManyDto): Promise<import("../entities/comment.entity").Comment[]>;
    createOne(req: any, file: Express.Multer.File, dto: CommentCreateOneDto): Promise<import("../entities/comment.entity").Comment>;
    updateOne(dto: CommentUpdateOneDto): Promise<import("../entities/comment.entity").Comment>;
    deleteOne(dto: CommentDeleteOneDto): Promise<import("../entities/comment.entity").Comment>;
    deleteMany(dto: CommentDeleteManyDto): Promise<import("../entities/comment.entity").Comment[]>;
}
