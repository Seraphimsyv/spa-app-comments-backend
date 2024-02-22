import { Comment } from '../../comment/entities/comment.entity';
export declare class User {
    readonly id: number;
    username: string;
    email: string;
    homePage?: string;
    password: string;
    comments: Comment[];
}
