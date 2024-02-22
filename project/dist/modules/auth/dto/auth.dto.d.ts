export declare class AuthLoginDto {
    readonly username: string;
    readonly password: string;
}
export declare class AuthSigninDto extends AuthLoginDto {
    readonly email: string;
    readonly homePage?: string;
}
