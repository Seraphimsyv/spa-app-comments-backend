import { CommentCreateCacheEvent, CommentCreatedEvent } from '../events/comment.event';
export declare class CommentListener {
    private readonly logger;
    handleCommentCreateCacheEvent(event: CommentCreateCacheEvent): Promise<void>;
    handleCommentCreatedEvent(event: CommentCreatedEvent): Promise<void>;
}
