import { EventEmitter2 } from '@nestjs/event-emitter';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/modules/user/services/user.service';
import { IAuthLoginData, IAuthSigninData } from '../interfaces/auth.interface';
export declare class AuthService {
    private readonly eventEmitter;
    private readonly userService;
    private readonly jwtService;
    constructor(eventEmitter: EventEmitter2, userService: UserService, jwtService: JwtService);
    logIn(data: IAuthLoginData): Promise<any>;
    signIn(data: IAuthSigninData): Promise<{
        access_token: string;
    }>;
    generatePayloadToken(payload: any): Promise<string>;
    validateToken(token: string): Promise<any>;
    hashingPassword(plainText: string, salt?: number): Promise<string>;
    validatePassword(enteredPwd: string, hashPwd: string): Promise<boolean>;
}
