import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { AuthService } from '../services/auth.services';
import { Server } from 'http';
import { Logger } from '@nestjs/common';
import { IWsAuthLogin, IWsAuthSignin } from '../interfaces/auth.interface';
import { UserService } from 'src/modules/user/services/user.service';

@WebSocketGateway(8020, {
  namespace: '/ws/auth',
  cors: {
    origin: '*',
  },
})
export class AuthGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(
    private readonly service: AuthService,
    private readonly userService: UserService,
  ) {}

  private readonly logger: Logger = new Logger(AuthGateway.name);

  @WebSocketServer()
  server: Server;
  /**
   *
   * @param server
   */
  afterInit() {
    this.logger.log('WebSocket server started!');
  }
  /**
   *
   * @param client
   * @param args
   */
  handleConnection(client: any) {
    this.logger.log(`Client with id: ${client.id} connected!`);
  }
  /**
   *
   * @param client
   */
  handleDisconnect(client: any) {
    this.logger.log(`Client with id: ${client.id} disconnected!`);
  }
  /**
   *
   * @param data
   * @returns
   */
  @SubscribeMessage('getProfile')
  async handleGetProfile(@MessageBody() data: { token: string }) {
    const { token } = data;

    if (!token) return this.server.emit('profileError', 'token required!');

    try {
      const payload = await this.service.validateToken(token);
      const user = await this.userService.findOne({ id: payload.id });

      if (!user) return this.server.emit('profileError', 'User not found');

      this.server.emit('profile', { ...user, password: undefined });
    } catch (err) {
      this.logger.error(`(getProfile) handle error: ${err.message}`);
      this.server.emit('profileError', err.message);
    }
  }
  /**
   *
   * @param data
   */
  @SubscribeMessage('logIn')
  async handleLogIn(@MessageBody() data: IWsAuthLogin) {
    if (!data.username)
      return this.server.emit('logInError', 'username required!');

    if (!data.password)
      return this.server.emit('logInError', 'password required!');

    try {
      const token = await this.service.logIn(data);

      this.server.emit('jwtToken', token);
    } catch (err) {
      this.logger.error(`(logInError) handle error: ${err.message}`);
      this.server.emit('logInError', err.message);
    }
  }
  /**
   *
   * @param data
   */
  @SubscribeMessage('signIn')
  async handleSignIn(@MessageBody() data: IWsAuthSignin) {
    if (!data.username)
      return this.server.emit('logInError', 'username required!');

    if (!data.password)
      return this.server.emit('logInError', 'password required!');

    if (!data.email) return this.server.emit('logInError', 'email required!');

    try {
      const token = await this.service.signIn(data);

      this.server.emit('jwtToken', token);
    } catch (err) {
      this.logger.error(`(signInError) handle error: ${err.message}`);
      this.server.emit('signInError', err.message);
    }
  }
}
