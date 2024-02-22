import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './services/auth.services';
import { UserModule } from '../user/user.module';
import { AuthController } from './controllers/auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { JWT_CONSTANTS } from 'src/common/constant';
import { APP_GUARD } from '@nestjs/core';
import { JwtGuard } from 'src/guards/jwt.guard';
import { AuthListener } from './listeners/auth.listener';
import { AuthGateway } from './gateways/auth.gateway';

@Module({
  imports: [
    forwardRef(() => UserModule),
    JwtModule.register({
      global: true,
      secret: JWT_CONSTANTS.secret,
      signOptions: JWT_CONSTANTS.signOptions,
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    AuthGateway,
    AuthListener,
    {
      provide: APP_GUARD,
      useClass: JwtGuard,
    },
  ],
  exports: [AuthService],
})
export class AuthModule {}
