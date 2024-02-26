import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { AuthService } from '../services/auth.services';
import { Server, Socket } from 'socket.io';
import { IWsAuthLogin, IWsAuthSignin } from '../interfaces/auth.interface';
import { UserService } from 'src/modules/user/services/user.service';
import { AbstractGateway } from 'src/common/abstract';

@WebSocketGateway(8010, {
  namespace: '/ws/auth',
  cors: {
    origin: '*',
  },
})
export class AuthGateway extends AbstractGateway {
  constructor(
    private readonly service: AuthService,
    private readonly userService: UserService,
  ) {
    super();
  }

  @WebSocketServer()
  server: Server;
  /**
   *
   * @param data
   * @returns
   */
  @SubscribeMessage('getProfile')
  async handleGetProfile(
    @MessageBody() data: { token: string },
    @ConnectedSocket() client: Socket,
  ) {
    const { token } = data;

    if (!token)
      return this.server.to(client.id).emit('profileError', 'token required!');

    try {
      const payload = await this.service.validateToken(token);
      const user = await this.userService.findOne({ id: payload.id });

      if (!user)
        return this.server.to(client.id).emit('profileError', 'User not found');

      this.proccessData(user);

      this.server.to(client.id).emit('profile', user);
    } catch (err) {
      this.logger.error(`(getProfile) handle error: ${err.message}`);
      this.server.to(client.id).emit('profileError', err.message);
    }
  }
  /**
   *
   * @param data
   */
  @SubscribeMessage('logIn')
  async handleLogIn(
    @MessageBody() data: IWsAuthLogin,
    @ConnectedSocket() client: Socket,
  ) {
    if (!data.username)
      return this.server.to(client.id).emit('logInError', 'username required!');

    if (!data.password)
      return this.server.to(client.id).emit('logInError', 'password required!');

    try {
      const token = await this.service.logIn(data);

      this.server.to(client.id).emit('jwtToken', token);
    } catch (err) {
      this.logger.error(`(logInError) handle error: ${err.message}`);
      console.log(client);
      this.server.to(client.id).emit('logInError', err.message);
    }
  }
  /**
   *
   * @param data
   */
  @SubscribeMessage('signIn')
  async handleSignIn(
    @MessageBody() data: IWsAuthSignin,
    @ConnectedSocket() client: Socket,
  ) {
    if (!data.username)
      return this.server
        .to(client.id)
        .emit('signInError', 'username required!');

    if (!data.password)
      return this.server
        .to(client.id)
        .emit('signInError', 'password required!');

    if (!data.email)
      return this.server.to(client.id).emit('signInError', 'email required!');

    try {
      const token = await this.service.signIn(data);

      this.server.to(client.id).emit('jwtToken', token);
    } catch (err) {
      this.logger.error(`(signInError) handle error: ${err.message}`);
      this.server.to(client.id).emit('signInError', err.message);
    }
  }
}
