import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from 'src/modules/comment/entities/comment.entity';
import { CommentController } from './controllers/comment.controller';
import { CommentService } from './services/comment.service';
import { FileModule } from '../file/file.module';
import { APP_FILTER } from '@nestjs/core';
import { CommentQueryFailedException } from 'src/exceptions/query.exceptions';
import { CommentListener } from './listeners/comment.listener';
import { UserModule } from '../user/user.module';
import { CommentGateway } from './gateways/comment.gateway';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Comment]),
    forwardRef(() => UserModule),
    forwardRef(() => AuthModule),
    FileModule,
  ],
  controllers: [CommentController],
  providers: [
    CommentService,
    CommentGateway,
    CommentListener,
    {
      provide: APP_FILTER,
      useClass: CommentQueryFailedException,
    },
  ],
  exports: [CommentService],
})
export class CommentModule {}
