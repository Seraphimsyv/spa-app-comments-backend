import { Comment } from 'src/modules/comment/entities/comment.entity';
import { FindOptionsWhere } from 'typeorm';
import { ICommentCreateData } from '../interfaces/comment.interfaces';
import { User } from 'src/modules/user/entities/user.entity';
declare class CommentQueryDto {
    readonly query: FindOptionsWhere<Comment>;
}
export declare class CommentGetManyDto {
    page: number;
    limit: number;
}
export declare class CommentCreateOneDto implements ICommentCreateData {
    text: string;
    parent?: number;
    author?: User;
    anonymAuthor?: string;
}
export declare class CommentUpdateOneDto extends CommentQueryDto {
    readonly updateData: Comment;
}
export declare class CommentDeleteOneDto extends CommentQueryDto {
}
export declare class CommentDeleteManyDto extends CommentQueryDto {
}
export {};
