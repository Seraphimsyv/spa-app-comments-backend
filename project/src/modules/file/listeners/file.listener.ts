import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { FileUploadedEvent } from '../events/file.event';

@Injectable()
export class FileListener {
  private readonly logger: Logger = new Logger(FileListener.name);
  /**
   *
   */
  @OnEvent('file.uploaded')
  async handleFileUploaded(event: FileUploadedEvent) {
    this.logger.debug(`File uploaded event: ${JSON.stringify(event)}`);
  }
}
