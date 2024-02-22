import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { CommentCreatedEvent } from '../events/comment.event';

@Injectable()
export class CommentListener {
  private readonly logger: Logger = new Logger(CommentListener.name);
  /**
   *
   * @param event
   */
  @OnEvent('comment.created')
  async handleCommentCreatedEvent(event: CommentCreatedEvent) {
    this.logger.debug(`Comment created event: ${JSON.stringify(event)}`);
  }
}
