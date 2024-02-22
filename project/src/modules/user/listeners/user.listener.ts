import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { UserCreatedEvent } from '../events/user.event';

@Injectable()
export class UserListener {
  private readonly logger: Logger = new Logger(UserListener.name);
  /**
   *
   * @param event
   */
  @OnEvent('user.created')
  async handleUserCreatedEvent(event: UserCreatedEvent) {
    this.logger.debug(`User created event: ${JSON.stringify(event)}`);
  }
}
