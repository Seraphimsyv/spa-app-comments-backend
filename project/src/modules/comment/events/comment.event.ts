export class CommentCreateCacheEvent {
  key: string;
}

export class CommentCreatedEvent {
  id: number;
  username: string;
  isAuth: boolean;
}
