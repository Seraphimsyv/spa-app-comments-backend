import { CommentCreatedEvent } from '../events/comment.event';
export declare class CommentListener {
    private readonly logger;
    handleCommentCreatedEvent(event: CommentCreatedEvent): Promise<void>;
}
