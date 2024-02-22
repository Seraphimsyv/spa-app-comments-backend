import { Logger } from '@nestjs/common';
import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { CommentService } from '../services/comment.service';
import { convertFileDataToFileObject, validationFile } from 'src/common/utils';
import {
  IWsCommentCreateData,
  IWsCommentGetMany,
} from '../interfaces/comment.interfaces';

@WebSocketGateway(8010, {
  namespace: '/ws/comment',
  cors: {
    origin: '*',
  },
})
export class CommentGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private readonly service: CommentService) {}

  private readonly logger: Logger = new Logger(CommentGateway.name);

  @WebSocketServer()
  server: Server;
  /**
   *
   */
  afterInit() {
    this.logger.log('WebSocket server started!');
  }
  /**
   *
   * @param client
   */
  handleConnection(client: Socket) {
    this.logger.log(`Client with id: ${client.id} connected!`);
  }
  /**
   *
   * @param client
   */
  handleDisconnect(client: any) {
    this.logger.log(`Client with id: ${client.id} disconnected!`);
  }
  /**
   *
   * @param client
   * @param data
   * @returns
   */
  @SubscribeMessage('getComments')
  async handleGetComments(@MessageBody() data: IWsCommentGetMany) {
    const { page, limit } = data;
    const pageOffset = page ? page : 1;
    const limitCount = limit ? limit : 25;
    const comments = await this.service.findMany(pageOffset, limitCount);

    this.server.emit('sendComments', comments);
  }
  /**
   *
   * @param client
   * @param data
   * @returns
   */
  @SubscribeMessage('createComment')
  async handleUploadFile(@MessageBody() data: IWsCommentCreateData) {
    const { comment, file } = data;

    if (file) {
      const convertedFile = await convertFileDataToFileObject(data.file);

      const fileValid = await validationFile(convertedFile);

      if (fileValid) {
        try {
          const result = await this.service.createOne(comment, convertedFile);

          this.server.emit('commentCreated', result);
        } catch (err) {
          this.logger.error(
            'ws create comment with file error: ' + err.message,
          );
        }
      }
    } else {
      try {
        const result = await this.service.createOne(comment);

        this.server.emit('commentCreated', result);
      } catch (err) {
        this.logger.error('ws create comment error: ' + err.message);
      }
    }
  }
}
