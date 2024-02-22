import { IsEmail, IsOptional, IsString } from 'class-validator';

export class AuthLoginDto {
  @IsString()
  readonly username: string;

  @IsString()
  readonly password: string;
}

export class AuthSigninDto extends AuthLoginDto {
  @IsString()
  @IsEmail()
  readonly email: string;

  @IsString()
  @IsOptional()
  readonly homePage?: string;
}
