import { Module } from '@nestjs/common';
import { FileService } from './services/file.service';
import { FileQueueService } from './services/file-queue.service';
import { BullModule } from '@nestjs/bull';
import { FileProcessor } from './processors/file.processor';
import { FileListener } from './listeners/file.listener';

@Module({
  imports: [BullModule.registerQueueAsync({ name: 'file' })],
  providers: [FileService, FileQueueService, FileProcessor, FileListener],
  exports: [FileService, FileQueueService],
})
export class FileModule {}
