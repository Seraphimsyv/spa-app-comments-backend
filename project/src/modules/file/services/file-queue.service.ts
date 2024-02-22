import { InjectQueue } from '@nestjs/bull';
import { Injectable, Logger } from '@nestjs/common';
import Bull, { Queue } from 'bull';

@Injectable()
export class FileQueueService {
  constructor(
    @InjectQueue('file')
    private readonly fileQueue: Queue,
  ) {}

  private readonly logger: Logger = new Logger(FileQueueService.name);
  /**
   *
   * @param file
   * @returns
   */
  async addSaveFileJob(file: Express.Multer.File): Promise<Bull.Job<any>> {
    this.logger.log('Add new job: SaveFile');

    return await this.fileQueue.add('save', { file });
  }
}
