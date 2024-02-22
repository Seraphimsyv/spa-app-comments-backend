"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const comment_module_1 = require("../comment/comment.module");
const database_module_1 = require("../database/database.module");
const event_emitter_1 = require("@nestjs/event-emitter");
const bull_1 = require("@nestjs/bull");
const user_module_1 = require("../user/user.module");
const utils_controller_1 = require("./controllers/utils.controller");
const utils_service_1 = require("./services/utils.service");
const auth_module_1 = require("../auth/auth.module");
const core_1 = require("@nestjs/core");
const password_interceptor_1 = require("../../interceptors/password.interceptor");
const file_module_1 = require("../file/file.module");
const constant_1 = require("../../common/constant");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            bull_1.BullModule.forRoot({
                redis: {
                    host: constant_1.REDIS_CONSTANTS.HOST,
                    port: constant_1.REDIS_CONSTANTS.PORT,
                },
            }),
            event_emitter_1.EventEmitterModule.forRoot(),
            database_module_1.DatabaseModule,
            comment_module_1.CommentModule,
            user_module_1.UserModule,
            auth_module_1.AuthModule,
            file_module_1.FileModule,
        ],
        controllers: [utils_controller_1.UtilsController],
        providers: [
            utils_service_1.UtilsService,
            {
                provide: core_1.APP_INTERCEPTOR,
                useClass: password_interceptor_1.PasswordInterceptor,
            },
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map