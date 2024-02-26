import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class PasswordHtppInterceptor implements NestInterceptor {
  /**
   *
   * @param context
   * @param next
   * @returns
   */
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const req: Request = context.switchToHttp().getRequest();

    return next.handle().pipe(
      map(async (data) => {
        if (
          !req.path.includes('get/file') ||
          !req.path.includes('download/file')
        )
          await this.findPassword(data);

        return data;
      }),
    );
  }
  /**
   *
   * @param obj
   */
  private async findPassword(obj: any) {
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (key === 'password') {
          obj['password'] = undefined;
        } else if (typeof obj[key] === 'object') {
          this.findPassword(obj[key]);
        }
      }
    }
  }
}
