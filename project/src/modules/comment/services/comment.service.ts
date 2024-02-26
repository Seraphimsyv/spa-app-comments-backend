import {
  BadRequestException,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from 'src/modules/comment/entities/comment.entity';
import { FindOptionsOrder, FindOptionsWhere, Repository } from 'typeorm';
import {
  CommentCreateCacheEvent,
  CommentCreatedEvent,
} from '../events/comment.event';
import { FileQueueService } from '../../file/services/file-queue.service';
import { ICommentCreateData } from '../interfaces/comment.interfaces';
import { IAnonymUser } from 'src/common/interfaces';
import { UserService } from 'src/modules/user/services/user.service';
import { EMAIL_REGEX } from 'src/common/regex';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { File } from 'src/modules/file/entities/file.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly repository: Repository<Comment>,
    private readonly eventEmitter: EventEmitter2,
    private readonly userService: UserService,
    private readonly fileQueueService: FileQueueService,
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {}

  private readonly logger: Logger = new Logger(CommentService.name);
  private readonly defaultOrderBy: FindOptionsOrder<Comment> = {
    createdAt: 'DESC',
  };
  /**
   *
   * @param where
   * @param orderBy
   * @returns
   */
  async findOne(where: FindOptionsWhere<Comment>): Promise<Comment> {
    const cacheData = await this.cacheManager.get(
      `COMMENTS#ONE#${JSON.stringify(where)}`,
    );

    if (cacheData) return cacheData as Comment;

    const comment = await this.repository.findOne({
      where: { ...where, parent: null },
      relations: {
        author: true,
        comments: true,
        file: true,
      },
    });

    if (!comment) return null;

    await this.cacheManager.set(
      `COMMENTS#ONE#${JSON.stringify(where)}`,
      comment,
    );

    const newCommentCreateCacheEvent = new CommentCreateCacheEvent();
    newCommentCreateCacheEvent.key = `COMMENTS#ONE#${JSON.stringify(where)}`;
    this.eventEmitter.emit('comment.create.cache', newCommentCreateCacheEvent);

    return comment;
  }
  /**
   *
   * @param where
   * @param orderBy
   * @returns
   */
  async findMany(
    page: number,
    limit: number,
    where?: FindOptionsWhere<Comment>,
    orderBy?: { column: string; sort: string },
  ): Promise<any> {
    const cacheData = await this.cacheManager.get(
      `COMMENTS#MANY#${page}#${limit}#${JSON.stringify(where)}#${JSON.stringify(orderBy)}`,
    );

    if (cacheData) return cacheData;

    const queryBuilder = this.repository.createQueryBuilder('comment');
    queryBuilder.leftJoinAndSelect('comment.file', 'file');
    queryBuilder.leftJoinAndSelect('comment.author', 'author');
    queryBuilder.leftJoinAndSelect('comment.comments', 'comments');

    queryBuilder.where('comment.parent IS NULL');

    if (where) {
      Object.keys(where).forEach((key) => {
        queryBuilder.andWhere(`comment.${key} = :${key}`, {
          [key]: where[key],
        });
      });
    }

    if (orderBy) {
      if (orderBy.sort === 'ASC') {
        if (orderBy.column !== 'username') {
          queryBuilder.orderBy(`comment.${orderBy.column}`, 'ASC');
        }
      } else {
        if (orderBy.column !== 'username') {
          queryBuilder.orderBy(`comment.${orderBy.column}`, 'DESC');
        }
      }
    } else {
      queryBuilder.orderBy('comment.createdAt', 'DESC');
    }

    // queryBuilder.take(limit);
    // queryBuilder.skip((page - 1) * limit);

    const comments = await queryBuilder.getMany();

    if (orderBy && orderBy.column === 'username' && orderBy.sort === 'ASC')
      comments.sort((a, b) => {
        const authorA = a.author?.username || a.anonymAuthor.username;
        const authorB = b.author?.username || b.anonymAuthor.username;
        return authorA.localeCompare(authorB);
      });
    else if (
      orderBy &&
      orderBy.column === 'username' &&
      orderBy.sort === 'DESC'
    )
      comments.sort((a, b) => {
        const authorA = a.author?.username || a.anonymAuthor.username;
        const authorB = b.author?.username || b.anonymAuthor.username;
        return authorB.localeCompare(authorA);
      });

    const data = await (
      await this.loadCircularChildren(comments)
    ).slice((page - 1) * limit, (page - 1) * limit + 25);

    const total = await this.repository.find();

    const newCacheData = {
      comments: data,
      currentPage: page,
      pages: Math.ceil(total.length / limit),
    };

    await this.cacheManager.set(
      `COMMENTS#MANY#${page}#${limit}#${JSON.stringify(where)}#${JSON.stringify(orderBy)}`,
      newCacheData,
    );

    const commentCreateCacheEvent = new CommentCreateCacheEvent();
    commentCreateCacheEvent.key = `COMMENTS#MANY#${page}#${limit}#${JSON.stringify(where)}#${JSON.stringify(orderBy)}`;
    this.eventEmitter.emit('comment.create.cache', commentCreateCacheEvent);

    return newCacheData;
  }
  /**
   *
   * @param comments
   * @returns
   */
  private async loadCircularChildren(comments: Comment[]): Promise<Comment[]> {
    for (const comment of comments) {
      comment.comments = await this.repository
        .createQueryBuilder('comment')
        .where(`comment.parent = ${comment.id}`)
        .leftJoinAndSelect('comment.file', 'file')
        .leftJoinAndSelect('comment.author', 'author')
        .leftJoinAndSelect('comment.comments', 'comments')
        .getMany();

      if (comment.comments.length > 0) {
        comment.comments = await this.loadCircularChildren(comment.comments);
      }
    }

    return comments;
  }
  /**
   *
   * @param createData
   * @param file
   * @returns
   */
  async createOne(
    createData: ICommentCreateData,
    file?: Express.Multer.File,
  ): Promise<Comment> {
    const newComment = this.repository.create();

    if (!createData.text) {
      throw new BadRequestException('Field required: text');
    } else {
      newComment.text = createData.text;
    }

    if (createData.parent) {
      const parentId = createData.parent as number;
      const parentComment = await this.findOne({ id: parentId });

      newComment.parent = parentComment;
    }

    if (createData.author) {
      const user = await this.userService.findOne({ id: createData.author.id });

      if (!user) throw new BadRequestException('User not found!');

      newComment.author = user;
    } else {
      if (!createData.anonymAuthor)
        throw new BadRequestException('Anonym fields required!');

      const anonymAuthor =
        typeof createData.anonymAuthor === 'string'
          ? (JSON.parse(createData.anonymAuthor) as IAnonymUser)
          : createData.anonymAuthor;

      if (!anonymAuthor.username)
        throw new BadRequestException('Anonym field `username` required!');

      if (!anonymAuthor.email)
        throw new BadRequestException('Anonym field `email` required!');

      if (!EMAIL_REGEX.test(anonymAuthor.email))
        throw new BadRequestException('Email not valid!');

      newComment.anonymAuthor = anonymAuthor;
    }

    if (file) {
      const job = await this.fileQueueService.addSaveFileJob(file);
      await job
        .finished()
        .then((result: { file: File }) => {
          newComment.file = result.file;
        })
        .catch((err: Error) => {
          throw new BadRequestException(err.message);
        });
    }

    const savedComment = await this.repository.save(newComment);

    /** Create create event */
    const commentCreatedEvent = new CommentCreatedEvent();
    commentCreatedEvent.id = savedComment.id;
    commentCreatedEvent.username = newComment.author
      ? newComment.author.username
      : newComment.anonymAuthor.username;
    commentCreatedEvent.isAuth = newComment.author ? true : false;

    this.eventEmitter.emit('comment.created', commentCreatedEvent);

    return savedComment;
  }
  /**
   *
   * @param where
   * @param updateData
   * @returns
   */
  async updateOne(
    where: FindOptionsWhere<Comment>,
    updateData: Comment,
  ): Promise<Comment> {
    const comment = await this.findOne(where);

    if (!comment)
      throw new BadRequestException('Comment not found for update!');

    const updatedComment = await this.repository.save({
      ...comment,
      ...updateData,
    });

    return updatedComment;
  }
  /**
   *
   * @param where
   * @returns
   */
  async deleteOne(where: FindOptionsWhere<Comment>): Promise<Comment> {
    const comment = await this.findOne(where);

    if (!comment)
      throw new BadRequestException('Comment not found for delete!');

    await this.repository.delete(comment);

    return comment;
  }
  /**
   *
   * @param where
   * @returns
   */
  async deleteMany(where: FindOptionsWhere<Comment>): Promise<Comment[]> {
    const comments = await this.repository.find();

    await this.repository.delete(where);

    return comments;
  }
}
