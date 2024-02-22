export class AuthLoginEvent {
  username: string;
  dateAt: Date;
}

export class AuthSigninEvent {
  id: number;
  username: string;
  email: string;
  homePage?: string;
}
