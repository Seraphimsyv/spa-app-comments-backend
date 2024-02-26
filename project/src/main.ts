import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';
import { ValidationPipe } from '@nestjs/common';
import { XssValidationPipe } from './pipes/xssValidation.pipe';
import { NEST_CONSTANTS } from './common/constant';

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule);
  // app.enableCors({
  //   origin: '*',
  // });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: {
        strategy: 'exposeAll',
      },
    }),
    new XssValidationPipe(),
  );

  app.setGlobalPrefix('api');

  await app.listen(NEST_CONSTANTS.PORT, NEST_CONSTANTS.HOST, () => {
    console.log(
      `Server starting on ${NEST_CONSTANTS.HOST}:${NEST_CONSTANTS.PORT}`,
    );
  });
};

bootstrap();
