import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { AuthLoginEvent, AuthSigninEvent } from '../events/auth.event';

@Injectable()
export class AuthListener {
  private readonly logger: Logger = new Logger(AuthListener.name);
  /**
   *
   * @param event
   */
  @OnEvent('auth.login')
  async handleAuthLoginEvent(event: AuthLoginEvent) {
    this.logger.debug(`Auth login event: ${JSON.stringify(event)}`);
  }
  @OnEvent('auth.signin')
  async handleAuthSigninEvent(event: AuthSigninEvent) {
    this.logger.debug(`Auth signin event: ${JSON.stringify(event)}`);
  }
}
