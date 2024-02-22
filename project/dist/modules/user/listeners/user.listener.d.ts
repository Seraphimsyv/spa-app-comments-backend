import { UserCreatedEvent } from '../events/user.event';
export declare class UserListener {
    private readonly logger;
    handleUserCreatedEvent(event: UserCreatedEvent): Promise<void>;
}
