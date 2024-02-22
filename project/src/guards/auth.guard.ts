import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JWT_CONSTANTS } from 'src/common/constant';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  private readonly logger: Logger = new Logger(AuthGuard.name);
  /**
   *
   * @param context
   * @returns
   */
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = (() => {
      const [type, token] = request.headers.authorization?.split(' ') ?? [];

      return type === 'Bearer' ? token : undefined;
    })();

    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: JWT_CONSTANTS.secret,
      });

      request['user'] = payload;
    } catch {
      throw new UnauthorizedException();
    }

    return true;
  }
}
