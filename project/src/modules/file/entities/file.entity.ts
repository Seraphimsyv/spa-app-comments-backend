import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class File {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ type: 'text', unique: false })
  public filename: string;

  @Column({ type: 'text', unique: true })
  public filepath: string;

  @Column({ type: 'time with time zone', default: () => 'CURRENT_TIMESTAMP' })
  public uploadAt: Date;
}
