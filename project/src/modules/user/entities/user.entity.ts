import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Comment } from '../../comment/entities/comment.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  public readonly id: number;

  @Column({ type: 'varchar', length: 50 })
  public username: string;

  @Column({ type: 'varchar', length: 50 })
  public email: string;

  @Column({ type: 'text', nullable: true })
  public homePage?: string;

  @Column({ type: 'text' })
  public password: string;

  @OneToMany(() => Comment, (comment) => comment.author)
  public comments: Comment[];
}
