import {
  BadRequestException,
  Injectable,
  Logger,
  OnModuleInit,
  OnModuleDestroy,
} from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from 'src/modules/comment/entities/comment.entity';
import { FindOptionsOrder, FindOptionsWhere, Repository } from 'typeorm';
import { CommentCreatedEvent } from '../events/comment.event';
import { FileQueueService } from '../../file/services/file-queue.service';
import { ICommentCreateData } from '../interfaces/comment.interfaces';
import { IAnonymUser } from 'src/common/interfaces';
import { UserService } from 'src/modules/user/services/user.service';
import { EMAIL_REGEX } from 'src/common/regex';

@Injectable()
export class CommentService implements OnModuleInit, OnModuleDestroy {
  constructor(
    @InjectRepository(Comment)
    private readonly repository: Repository<Comment>,
    private readonly eventEmitter: EventEmitter2,
    private readonly userService: UserService,
    private readonly fileQueueService: FileQueueService,
  ) {}

  private readonly logger: Logger = new Logger(CommentService.name);
  private readonly defaultOrderBy: FindOptionsOrder<Comment> = {
    createdAt: 'DESC',
  };

  async onModuleInit() {
    // await this.repository.clear();
    // const comments: Comment[] = [];
    // for (let i = 1; i < 30; i++) {
    //   const date = new Date();
    //   date.setMinutes(i);
    //   const newComment = await this.repository.create({
    //     text: `Text id ${i}`,
    //     createdAt: date,
    //   });
    //   comments.push(newComment);
    // }
    // await this.repository.save(comments);
  }
  async onModuleDestroy() {
    // await this.deleteMany({});
  }
  /**
   *
   * @param where
   * @param orderBy
   * @returns
   */
  async findOne(
    where: FindOptionsWhere<Comment>,
    orderBy?: FindOptionsOrder<Comment>,
  ): Promise<Comment> {
    const comment = await this.repository.findOne({
      where: where,
      order: orderBy ? orderBy : this.defaultOrderBy,
      relations: {
        author: true,
      },
    });

    if (!comment) return null;

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
    orderBy?: FindOptionsOrder<Comment>,
  ): Promise<Comment[]> {
    const comments = await this.repository.find({
      where: where,
      order: orderBy ? orderBy : this.defaultOrderBy,
      take: limit,
      skip: (page - 1) * limit,
      relations: {
        author: true,
      },
    });

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
        .then((result: { filePath: string }) => {
          newComment.filePath = result.filePath;
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
