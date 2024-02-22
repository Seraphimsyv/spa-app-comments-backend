import { IAnonymUser } from 'src/common/interfaces';
import { User } from 'src/modules/user/entities/user.entity';
export interface ICommentCreateData {
    text: string;
    parent?: number;
    author?: User;
    anonymAuthor?: string;
}
export interface IWsCommentGetMany {
    page?: number;
    limit?: number;
}
export interface IWsCommentCreateData {
    comment: ICommentCreateData & {
        author?: string;
        anonymAuthor?: IAnonymUser;
    };
    file?: {
        filename: string;
        content: string;
    };
}
