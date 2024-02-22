/// <reference types="node" />
import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit } from '@nestjs/websockets';
import { AuthService } from '../services/auth.services';
import { Server } from 'http';
import { IWsAuthLogin, IWsAuthSignin } from '../interfaces/auth.interface';
import { UserService } from 'src/modules/user/services/user.service';
export declare class AuthGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    private readonly service;
    private readonly userService;
    constructor(service: AuthService, userService: UserService);
    private readonly logger;
    server: Server;
    afterInit(): void;
    handleConnection(client: any): void;
    handleDisconnect(client: any): void;
    handleGetProfile(data: {
        token: string;
    }): Promise<boolean>;
    handleLogIn(data: IWsAuthLogin): Promise<boolean>;
    handleSignIn(data: IWsAuthSignin): Promise<boolean>;
}
