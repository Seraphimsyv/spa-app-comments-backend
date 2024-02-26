import { Logger } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';

export class AbstractGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor() {
    this.logger = new Logger((<typeof AbstractGateway>this.constructor).name);
  }

  readonly logger: Logger;

  afterInit() {
    this.logger.log('WebSocket server started!');
  }
  /**
   *
   * @param client
   */
  handleConnection(client: Socket) {
    this.logger.log(`Client with id: ${client.id} connected!`);
    client.join(client.id);
  }
  /**
   *
   * @param client
   */
  handleDisconnect(client: Socket) {
    this.logger.log(`Client with id: ${client.id} disconnected!`);
    client.leave(client.id);
  }
  /**
   *
   * @param data
   */
  async proccessData(data: object) {
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        if (key === 'password') {
          delete data[key];
        } else if (key === 'filepath' && typeof data[key] === 'string') {
          data[key] = data[key].split('./uploads').pop();
        } else if (typeof data[key] === 'object') {
          this.proccessData(data[key]);
        }
      }
    }
  }
}
