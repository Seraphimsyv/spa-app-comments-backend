import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { FindOptionsOrder, FindOptionsWhere, Repository } from 'typeorm';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { IUserCreateData } from '../interfaces/user.interface';
import { UserCreatedEvent } from '../events/user.event';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
    private readonly eventEmitter: EventEmitter2,
  ) {}
  private readonly logger: Logger = new Logger(UserService.name);
  /**
   *
   * @param where
   * @param orderBy
   * @returns
   */
  async findOne(
    where: FindOptionsWhere<User>,
    orderBy?: FindOptionsOrder<User>,
  ): Promise<User | null> {
    const user = await this.repository.findOne({
      where: where,
      order: orderBy ? orderBy : undefined,
      relations: {
        comments: true,
      },
    });

    if (!user) return null;

    return user;
  }
  /**
   *
   * @param where
   * @param orderBy
   * @returns
   */
  async findMany(
    where: FindOptionsWhere<User>,
    orderBy?: FindOptionsOrder<User>,
  ): Promise<User[]> {
    const users = await this.repository.find({
      where: where,
      order: orderBy ? orderBy : undefined,
      relations: {
        comments: true,
      },
    });

    return users;
  }
  /**
   *
   * @param createData
   * @returns
   */
  async createOne(createData: IUserCreateData): Promise<User> {
    const newUser = await this.repository.create(createData);
    const createdUser = await this.repository.save(newUser);

    /** Create user created event */
    const userCreatedEvent = new UserCreatedEvent();
    userCreatedEvent.id = createdUser.id;
    userCreatedEvent.username = createdUser.username;
    userCreatedEvent.email = createdUser.email;
    userCreatedEvent.homePage = createdUser.homePage;
    this.eventEmitter.emit('user.created', userCreatedEvent);

    return createdUser;
  }
  /**
   *
   * @param where
   * @param updateData
   * @returns
   */
  async updateOne(
    where: FindOptionsWhere<User>,
    updateData: User,
  ): Promise<User> {
    const user = await this.findOne(where);

    if (!user) throw new BadRequestException('User not found for update!');

    const updatedUser = await this.repository.save({
      ...user,
      ...updateData,
    });

    return updatedUser;
  }
  /**
   *
   * @param where
   * @returns
   */
  async deleteOne(where: FindOptionsWhere<User>): Promise<User> {
    const user = await this.findOne(where);

    if (!user) throw new BadRequestException('User not found for delete!');

    await this.repository.delete(user);

    return user;
  }
  /**
   *
   * @param where
   * @returns
   */
  async deleteMany(where: FindOptionsWhere<User>): Promise<User[]> {
    const users = await this.findMany(where);

    await this.repository.delete(where);

    return users;
  }
}
