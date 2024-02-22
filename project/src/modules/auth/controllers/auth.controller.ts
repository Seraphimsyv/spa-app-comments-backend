import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '../services/auth.services';
import { AuthLoginDto, AuthSigninDto } from '../dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly service: AuthService) {}
  /**
   *
   * @param dto
   * @returns
   */
  @Post('/login')
  async logIn(@Body() dto: AuthLoginDto) {
    return await this.service.logIn(dto);
  }
  /**
   *
   * @param dto
   * @returns
   */
  @Post('/signin')
  async signIn(@Body() dto: AuthSigninDto) {
    return await this.service.signIn(dto);
  }
}
