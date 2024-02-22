import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { POSTGRES_CONSTANTS } from 'src/common/constant';
import { Comment } from 'src/modules/comment/entities/comment.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => {
        return {
          type: 'postgres',
          host: POSTGRES_CONSTANTS.HOST,
          port: POSTGRES_CONSTANTS.PORT,
          username: POSTGRES_CONSTANTS.USER,
          password: POSTGRES_CONSTANTS.PASSWORD,
          database: POSTGRES_CONSTANTS.NAME,
          entities: ['dist/**/*.entity{.ts,.js}'],
          synchronize: true,
        };
      },
    }),
    TypeOrmModule.forFeature([Comment]),
  ],
})
export class DatabaseModule {}
