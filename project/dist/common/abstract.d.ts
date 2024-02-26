import { Logger } from '@nestjs/common';
import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit } from '@nestjs/websockets';
import { Socket } from 'socket.io';
export declare class AbstractGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    constructor();
    readonly logger: Logger;
    afterInit(): void;
    handleConnection(client: Socket): void;
    handleDisconnect(client: Socket): void;
    proccessData(data: object): Promise<void>;
}
