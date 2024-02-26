import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import {
  CommentCreateCacheEvent,
  CommentCreatedEvent,
} from '../events/comment.event';

@Injectable()
export class CommentListener {
  private readonly logger: Logger = new Logger(CommentListener.name);
  /**
   *
   * @param event
   */
  @OnEvent('comment.create.cache')
  async handleCommentCreateCacheEvent(event: CommentCreateCacheEvent) {
    this.logger.debug(`Comment create cache: ${JSON.stringify(event)}`);
  }
  /**
   *
   * @param event
   */
  @OnEvent('comment.created')
  async handleCommentCreatedEvent(event: CommentCreatedEvent) {
    this.logger.debug(`Comment created event: ${JSON.stringify(event)}`);
  }
}
