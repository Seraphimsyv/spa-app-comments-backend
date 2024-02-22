import { User } from '../entities/user.entity';
import { FindOptionsOrder, FindOptionsWhere, Repository } from 'typeorm';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { IUserCreateData } from '../interfaces/user.interface';
export declare class UserService {
    private readonly repository;
    private readonly eventEmitter;
    constructor(repository: Repository<User>, eventEmitter: EventEmitter2);
    private readonly logger;
    findOne(where: FindOptionsWhere<User>, orderBy?: FindOptionsOrder<User>): Promise<User | null>;
    findMany(where: FindOptionsWhere<User>, orderBy?: FindOptionsOrder<User>): Promise<User[]>;
    createOne(createData: IUserCreateData): Promise<User>;
    updateOne(where: FindOptionsWhere<User>, updateData: User): Promise<User>;
    deleteOne(where: FindOptionsWhere<User>): Promise<User>;
    deleteMany(where: FindOptionsWhere<User>): Promise<User[]>;
}
