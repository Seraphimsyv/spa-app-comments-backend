import {
  OnQueueActive,
  OnQueueCompleted,
  OnQueueError,
  OnQueueFailed,
  Process,
  Processor,
} from '@nestjs/bull';
import { Job } from 'bull';
import { FileService } from '../services/file.service';
import { Logger } from '@nestjs/common';

@Processor('file')
export class FileProcessor {
  constructor(private readonly fileService: FileService) {}

  private readonly logger: Logger = new Logger(FileProcessor.name);
  /**
   *
   * @param job
   * @returns
   */
  @Process('save')
  async saveFile(job: Job) {
    const file = await this.fileService.saveFile(job.data.file);

    try {
      return { filePath: file.path };
    } catch (err) {
      this.logger.warn('Invalid result');
    }
  }
  /**
   *
   * @param job
   */
  @OnQueueActive()
  onActive(job: Job) {
    this.logger.log(`Processing job #${job.id} of type ${job.name}...`);
  }
  /**
   *
   * @param job
   */
  @OnQueueCompleted({ name: 'save' })
  onCompletedSave(job: Job) {
    this.logger.log(
      `(Complete) on complete: job #${job.id} -> result: file saved successfully!`,
    );
  }
  /**
   *
   * @param job
   */
  @OnQueueError()
  onError(job: Job) {
    this.logger.error(`Error with job: #${job.id} - ${job.failedReason}`);
  }
  /**
   *
   * @param job
   */
  @OnQueueFailed()
  onFailed(job: Job) {
    this.logger.warn(`Failed job: #${job.id} - ${job.failedReason}`);
  }
}
