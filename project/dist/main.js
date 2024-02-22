"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./modules/app/app.module");
const common_1 = require("@nestjs/common");
const xssValidation_pipe_1 = require("./pipes/xssValidation.pipe");
const constant_1 = require("./common/constant");
const bootstrap = async () => {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalPipes(new common_1.ValidationPipe({
        transform: true,
        transformOptions: {
            strategy: 'exposeAll',
        },
    }), new xssValidation_pipe_1.XssValidationPipe());
    app.setGlobalPrefix('api');
    await app.listen(constant_1.NEST_CONSTANTS.PORT, constant_1.NEST_CONSTANTS.HOST);
};
bootstrap();
//# sourceMappingURL=main.js.map