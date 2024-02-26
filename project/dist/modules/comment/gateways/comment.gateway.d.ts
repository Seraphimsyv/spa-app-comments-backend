import { Server, Socket } from 'socket.io';
import { CommentService } from '../services/comment.service';
import { IWsCommentCreateData, IWsCommentGetMany } from '../interfaces/comment.interfaces';
import { AuthService } from 'src/modules/auth/services/auth.services';
import { AbstractGateway } from 'src/common/abstract';
export declare class CommentGateway extends AbstractGateway {
    private readonly service;
    private readonly authService;
    constructor(service: CommentService, authService: AuthService);
    server: Server;
    handleGetComments(data: IWsCommentGetMany, client: Socket): Promise<void>;
    handleUploadFile(data: IWsCommentCreateData, client: Socket): Promise<boolean>;
}
