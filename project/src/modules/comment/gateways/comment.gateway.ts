import {
  ConnectedSocket,
  MessageBody,
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
import { AuthService } from 'src/modules/auth/services/auth.services';
import { AbstractGateway } from 'src/common/abstract';

@WebSocketGateway(8020, {
  namespace: '/ws/comment',
  cors: {
    origin: '*',
  },
})
export class CommentGateway extends AbstractGateway {
  constructor(
    private readonly service: CommentService,
    private readonly authService: AuthService,
  ) {
    super();
  }

  @WebSocketServer()
  server: Server;
  /**
   *
   * @param client
   * @param data
   * @returns
   */
  @SubscribeMessage('getComments')
  async handleGetComments(
    @MessageBody() data: IWsCommentGetMany,
    @ConnectedSocket() client: Socket,
  ) {
    const { page, limit, orderBy } = data;
    const pageOffset = page ? page : 1;
    const limitCount = limit ? limit : 25;
    const order = orderBy ? orderBy : { column: 'createdAt', sort: 'DESC' };
    const comments = await this.service.findMany(
      pageOffset,
      limitCount,
      {},
      order,
    );

    this.proccessData(comments);

    this.server.to(client.id).emit('reciveComments', comments);
  }
  /**
   *
   * @param client
   * @param data
   * @returns
   */
  @SubscribeMessage('createComment')
  async handleUploadFile(
    @MessageBody() data: IWsCommentCreateData,
    @ConnectedSocket() client: Socket,
  ) {
    const { comment, file } = data;

    if (comment.author) {
      const user = await this.authService.validateToken(comment.author);

      if (!user)
        return this.server.to(client.id).emit('jwtError', 'Jwt token expired');

      comment.author = user;
    }

    if (file) {
      const convertedFile = await convertFileDataToFileObject(data.file);

      const fileValid = await validationFile(convertedFile);

      if (fileValid) {
        try {
          const result = await this.service.createOne(comment, convertedFile);

          this.server.to(client.id).emit('commentCreated', result);
        } catch (err) {
          this.logger.error(
            'ws create comment with file error: ' + err.message,
          );
        }
      }
    } else {
      try {
        const result = await this.service.createOne(comment);

        this.server.to(client.id).emit('commentCreated', result);
      } catch (err) {
        this.logger.error('ws create comment error: ' + err.message);
      }
    }
  }
}
