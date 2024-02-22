import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from 'src/modules/user/services/user.service';
import { AuthLoginEvent, AuthSigninEvent } from '../events/auth.event';
import { IAuthLoginData, IAuthSigninData } from '../interfaces/auth.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly eventEmitter: EventEmitter2,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}
  /**
   *
   * @param data
   * @returns
   */
  async logIn(data: IAuthLoginData): Promise<any> {
    const { username, password } = data;
    const user = await this.userService.findOne({ username });

    if (!user) throw new BadRequestException('User not found!');

    const isCompare = await this.validatePassword(password, user.password);

    if (!isCompare) throw new UnauthorizedException();

    /** Prepare payload */
    const payload = { ...user, password: undefined };

    /** Create jwt token */
    const token = await this.generatePayloadToken(payload);

    /** Create auth login event */
    const authLoginEvent = new AuthLoginEvent();
    authLoginEvent.username = user.username;
    authLoginEvent.dateAt = new Date();
    this.eventEmitter.emit('auth.login', authLoginEvent);

    return { access_token: token };
  }
  /**
   *
   * @param data
   * @returns
   */
  async signIn(data: IAuthSigninData) {
    const checkUsername = await this.userService.findOne({
      username: data.username,
    });

    if (checkUsername)
      throw new BadRequestException(
        'User aleady exists with username: ' + data.username,
      );

    const checkEmail = await this.userService.findOne({ email: data.email });

    if (checkEmail)
      throw new BadRequestException(
        'User already exists with email: ' + data.email,
      );

    const newUser = await this.userService.createOne({
      ...data,
      password: await this.hashingPassword(data.password),
    });

    /** Create auth signin event */
    const userRegisteredEvent = new AuthSigninEvent();
    userRegisteredEvent.id = newUser.id;
    userRegisteredEvent.username = newUser.username;
    userRegisteredEvent.email = newUser.email;
    userRegisteredEvent.homePage = newUser.homePage;
    this.eventEmitter.emit('auth.signin', userRegisteredEvent);

    const token = await this.generatePayloadToken({
      ...newUser,
      password: undefined,
    });

    return { access_token: token };
  }
  /**
   *
   * @param payload
   * @returns
   */
  async generatePayloadToken(payload: any): Promise<string> {
    return await this.jwtService.signAsync(payload);
  }
  /**
   *
   * @param token
   * @returns
   */
  async validateToken(token: string): Promise<any> {
    return await this.jwtService.verifyAsync(token);
  }
  /**
   *
   * @param plainText
   * @param salt
   * @returns
   */
  async hashingPassword(plainText: string, salt: number = 10): Promise<string> {
    return await bcrypt.hash(plainText, salt);
  }
  /**
   *
   * @param enteredPwd
   * @param hashPwd
   * @returns
   */
  async validatePassword(
    enteredPwd: string,
    hashPwd: string,
  ): Promise<boolean> {
    return await bcrypt.compare(enteredPwd, hashPwd);
  }
}
