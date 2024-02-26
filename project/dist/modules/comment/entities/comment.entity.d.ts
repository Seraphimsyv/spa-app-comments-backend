import { User } from '../../user/entities/user.entity';
import { IAnonymUser } from 'src/common/interfaces';
import { File } from 'src/modules/file/entities/file.entity';
export declare class Comment {
    readonly id: number;
    text: string;
    file?: File;
    parent?: Comment;
    comments: Comment[];
    author?: User;
    anonymAuthor?: IAnonymUser;
    createdAt: Date;
}
