import { AuthService } from '../services/auth.services';
import { AuthLoginDto, AuthSigninDto } from '../dto/auth.dto';
export declare class AuthController {
    private readonly service;
    constructor(service: AuthService);
    logIn(dto: AuthLoginDto): Promise<any>;
    signIn(dto: AuthSigninDto): Promise<{
        access_token: string;
    }>;
}
