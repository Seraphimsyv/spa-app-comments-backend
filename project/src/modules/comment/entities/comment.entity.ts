import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { IAnonymUser } from 'src/common/interfaces';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  public readonly id: number;

  @Column({ type: 'text' })
  public text: string;

  @Column({ type: 'text', nullable: true })
  public filePath?: string;

  @ManyToOne(() => Comment, (comment) => comment.parent, { nullable: true })
  public parent?: Comment;

  @OneToMany(() => Comment, (comment) => comment.comments)
  public comments: Comment[];

  @ManyToOne(() => User, (author) => author.comments, { nullable: true })
  public author?: User;

  @Column({ type: 'json', nullable: true })
  public anonymAuthor?: IAnonymUser;

  @Column({
    type: 'timestamp with time zone',
    default: () => 'CURRENT_TIMESTAMP',
  })
  public createdAt: Date;
}
