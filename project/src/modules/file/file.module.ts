import { Module } from '@nestjs/common';
import { FileService } from './services/file.service';
import { FileQueueService } from './services/file-queue.service';
import { BullModule } from '@nestjs/bull';
import { FileProcessor } from './processors/file.processor';
import { FileListener } from './listeners/file.listener';
import { TypeOrmModule } from '@nestjs/typeorm';
import { File } from './entities/file.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([File]),
    BullModule.registerQueueAsync({ name: 'file' }),
  ],
  providers: [FileService, FileQueueService, FileProcessor, FileListener],
  exports: [FileService, FileQueueService],
})
export class FileModule {}
