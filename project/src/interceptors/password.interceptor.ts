import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class PasswordInterceptor implements NestInterceptor {
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
    return next.handle().pipe(
      map((data) => {
        this.findPassword(data);

        return data;
      }),
    );
  }
  /**
   *
   * @param obj
   */
  private findPassword(obj: object) {
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
