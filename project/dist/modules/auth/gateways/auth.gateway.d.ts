import { AuthService } from '../services/auth.services';
import { Server, Socket } from 'socket.io';
import { IWsAuthLogin, IWsAuthSignin } from '../interfaces/auth.interface';
import { UserService } from 'src/modules/user/services/user.service';
import { AbstractGateway } from 'src/common/abstract';
export declare class AuthGateway extends AbstractGateway {
    private readonly service;
    private readonly userService;
    constructor(service: AuthService, userService: UserService);
    server: Server;
    handleGetProfile(data: {
        token: string;
    }, client: Socket): Promise<boolean>;
    handleLogIn(data: IWsAuthLogin, client: Socket): Promise<boolean>;
    handleSignIn(data: IWsAuthSignin, client: Socket): Promise<boolean>;
}
