import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';
import { QueryFailedError } from 'typeorm';

@Catch(QueryFailedError)
export class UserQueryFailedException implements ExceptionFilter {
  private readonly logger: Logger = new Logger(UserQueryFailedException.name);
  /**
   *
   * @param exception
   * @param host
   */
  catch(exception: QueryFailedError, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response: Response = context.getResponse();

    this.logger.error(exception.message);
    console.log(exception);

    response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      message: 'Error executing to user database table query!',
      errorCode: 'USER_QUERY_FAILED',
    });
  }
}

@Catch(QueryFailedError)
export class CommentQueryFailedException implements ExceptionFilter {
  private readonly logger: Logger = new Logger(
    CommentQueryFailedException.name,
  );
  /**
   *
   * @param exception
   * @param host
   */
  catch(exception: QueryFailedError, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response: Response = context.getResponse();

    this.logger.error(exception.message);
    console.log(exception);

    response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      message: 'Error executing to comment database table query!',
      errorCode: 'COMMENT_QUERY_FAILED',
    });
  }
}
