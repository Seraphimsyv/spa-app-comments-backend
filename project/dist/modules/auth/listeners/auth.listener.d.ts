import { AuthLoginEvent, AuthSigninEvent } from '../events/auth.event';
export declare class AuthListener {
    private readonly logger;
    handleAuthLoginEvent(event: AuthLoginEvent): Promise<void>;
    handleAuthSigninEvent(event: AuthSigninEvent): Promise<void>;
}
