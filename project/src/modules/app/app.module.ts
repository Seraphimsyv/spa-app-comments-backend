import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { BullModule } from '@nestjs/bull';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { PasswordHtppInterceptor } from 'src/interceptors/password.interceptor';
import { FileModule } from '../file/file.module';
import { UserModule } from '../user/user.module';
import { UtilsController } from './controllers/utils.controller';
import { UtilsService } from './services/utils.service';
import { AuthModule } from '../auth/auth.module';
import { CommentModule } from '../comment/comment.module';
import { DatabaseModule } from '../database/database.module';
import { REDIS_CONSTANTS } from 'src/common/constant';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    BullModule.forRoot({
      redis: {
        host: REDIS_CONSTANTS.HOST,
        port: REDIS_CONSTANTS.PORT,
      },
    }),
    CacheModule.register({
      isGlobal: true,
      ttl: 1000 * 60 * 1,
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
      useClass: PasswordHtppInterceptor,
    },
  ],
})
export class AppModule {}
