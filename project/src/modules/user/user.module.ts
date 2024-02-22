import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service';
import { CommentModule } from '../comment/comment.module';
import { APP_FILTER } from '@nestjs/core';
import { UserQueryFailedException } from 'src/exceptions/query.exceptions';
import { UserListener } from './listeners/user.listener';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    forwardRef(() => AuthModule),
    forwardRef(() => CommentModule),
  ],
  controllers: [UserController],
  providers: [
    UserService,
    UserListener,
    {
      provide: APP_FILTER,
      useClass: UserQueryFailedException,
    },
  ],
  exports: [UserService],
})
export class UserModule {}
