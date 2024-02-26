import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import {
  FileCreatedEvent,
  FileResizedEvent,
  FileUploadedEvent,
} from '../events/file.event';

@Injectable()
export class FileListener {
  private readonly logger: Logger = new Logger(FileListener.name);
  /**
   *
   * @param event
   */
  @OnEvent('file.created')
  async handleFileCreated(event: FileCreatedEvent) {
    this.logger.debug(`File created event: ${JSON.stringify(event)}`);
  }
  /**
   *
   * @param event
   */
  @OnEvent('file.resized')
  async handleFileResized(event: FileResizedEvent) {
    this.logger.debug(`File resized event: ${JSON.stringify(event)}`);
  }
  /**
   *
   */
  @OnEvent('file.uploaded')
  async handleFileUploaded(event: FileUploadedEvent) {
    this.logger.debug(`File uploaded event: ${JSON.stringify(event)}`);
  }
}
