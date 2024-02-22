import { User } from '../../user/entities/user.entity';
import { IAnonymUser } from 'src/common/interfaces';
export declare class Comment {
    readonly id: number;
    text: string;
    filePath?: string;
    parent?: Comment;
    comments: Comment[];
    author?: User;
    anonymAuthor?: IAnonymUser;
    createdAt: Date;
}
