import { IAnonymUser } from 'src/common/interfaces';
import { User } from 'src/modules/user/entities/user.entity';

export interface ICommentCreateData {
  text: string;
  parent?: number;
  author?: User;
  anonymAuthor?: string;
}

/**
 * WebSocket body data
 */

export interface IWsCommentGetMany {
  page?: number;
  limit?: number;
  orderBy?: { column: string; sort: 'DESC' | 'ASC' };
}

export interface IWsCommentCreateData {
  comment: ICommentCreateData & {
    author?: string;
    anonymAuthor?: IAnonymUser;
  };
  file?: { filename: string; content: string };
}
