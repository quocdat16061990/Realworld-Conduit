import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import _ from 'lodash';
@Injectable()
export class SerializeInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      switchMap((response) => {
        if (!response) return of(response);
        return [this.formatResponse(response)];
      }),
    );
  }
  formatResponse(response: any) {
    if (response instanceof Object) {
      return {
        status: 200,
        data: _.omit(response, 'refreshToken', 'refreshTokenExprieTime'),
      };
    }
  }
}
