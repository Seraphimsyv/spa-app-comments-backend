import { ArgumentsHost, ExceptionFilter } from '@nestjs/common';
import { QueryFailedError } from 'typeorm';
export declare class UserQueryFailedException implements ExceptionFilter {
    private readonly logger;
    catch(exception: QueryFailedError, host: ArgumentsHost): void;
}
export declare class CommentQueryFailedException implements ExceptionFilter {
    private readonly logger;
    catch(exception: QueryFailedError, host: ArgumentsHost): void;
}
