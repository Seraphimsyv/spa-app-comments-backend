export interface IAuthLoginData {
  readonly username: string;
  readonly password: string;
}

export interface IAuthSigninData extends IAuthLoginData {
  readonly email: string;
  readonly homePage?: string;
}

/**
 * WebSocket body data
 */

export interface IWsAuthLogin {
  username: string;
  password: string;
}

export interface IWsAuthSignin {
  username: string;
  password: string;
  email: string;
  homePage?: string;
}
