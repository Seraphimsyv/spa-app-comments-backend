import {
  IsNumberString,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';
import { Comment } from 'src/modules/comment/entities/comment.entity';
import { FindOptionsWhere } from 'typeorm';
import { ICommentCreateData } from '../interfaces/comment.interfaces';
import { User } from 'src/modules/user/entities/user.entity';

class CommentQueryDto {
  @IsObject()
  readonly query: FindOptionsWhere<Comment>;
}

export class CommentGetManyDto {
  page: number;
  limit: number;
}

export class CommentCreateOneDto implements ICommentCreateData {
  @IsString()
  public text: string;

  @IsNumberString()
  @IsOptional()
  public parent?: number;

  @IsObject()
  @IsOptional()
  public author?: User;

  @IsString()
  @IsOptional()
  public anonymAuthor?: string;
}

export class CommentUpdateOneDto extends CommentQueryDto {
  @IsObject()
  readonly updateData: Comment;
}

export class CommentDeleteOneDto extends CommentQueryDto {}

export class CommentDeleteManyDto extends CommentQueryDto {}
