import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { IAnonymUser } from 'src/common/interfaces';
import { File } from 'src/modules/file/entities/file.entity';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  public readonly id: number;

  @Column({ type: 'text' })
  public text: string;

  @OneToOne(() => File, { nullable: true })
  @JoinColumn()
  public file?: File;

  @ManyToOne(() => Comment, (comment) => comment.comments, { nullable: true })
  public parent?: Comment;

  @OneToMany(() => Comment, (comment) => comment.parent)
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
