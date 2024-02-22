import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JWT_CONSTANTS } from 'src/common/constant';

@Injectable()
export class JwtGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}
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

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: JWT_CONSTANTS.secret,
      });

      request['user'] = payload;
    } catch {}

    return true;
  }
}
