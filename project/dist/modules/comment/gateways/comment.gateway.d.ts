import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { CommentService } from '../services/comment.service';
import { IWsCommentCreateData, IWsCommentGetMany } from '../interfaces/comment.interfaces';
export declare class CommentGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    private readonly service;
    constructor(service: CommentService);
    private readonly logger;
    server: Server;
    afterInit(): void;
    handleConnection(client: Socket): void;
    handleDisconnect(client: any): void;
    handleGetComments(data: IWsCommentGetMany): Promise<void>;
    handleUploadFile(data: IWsCommentCreateData): Promise<void>;
}
