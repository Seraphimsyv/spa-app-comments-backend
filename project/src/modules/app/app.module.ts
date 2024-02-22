import { Module } from '@nestjs/common';
import { CommentModule } from '../comment/comment.module';
import { DatabaseModule } from '../database/database.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { BullModule } from '@nestjs/bull';
import { UserModule } from '../user/user.module';
import { UtilsController } from './controllers/utils.controller';
import { UtilsService } from './services/utils.service';
import { AuthModule } from '../auth/auth.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { PasswordInterceptor } from 'src/interceptors/password.interceptor';
import { FileModule } from '../file/file.module';
import { REDIS_CONSTANTS } from 'src/common/constant';

@Module({
  imports: [
    BullModule.forRoot({
      redis: {
        host: REDIS_CONSTANTS.HOST,
        port: REDIS_CONSTANTS.PORT,
      },
    }),
    EventEmitterModule.forRoot(),
    DatabaseModule,
    CommentModule,
    UserModule,
    AuthModule,
    FileModule,
  ],
  controllers: [UtilsController],
  providers: [
    UtilsService,
    {
      provide: APP_INTERCEPTOR,
      useClass: PasswordInterceptor,
    },
  ],
})
export class AppModule {}
