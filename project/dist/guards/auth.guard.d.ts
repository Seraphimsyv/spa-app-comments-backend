import { CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
export declare class AuthGuard implements CanActivate {
    private readonly jwtService;
    constructor(jwtService: JwtService);
    private readonly logger;
    canActivate(context: ExecutionContext): Promise<boolean>;
}
