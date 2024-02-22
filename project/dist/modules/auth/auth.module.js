"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const auth_services_1 = require("./services/auth.services");
const user_module_1 = require("../user/user.module");
const auth_controller_1 = require("./controllers/auth.controller");
const jwt_1 = require("@nestjs/jwt");
const constant_1 = require("../../common/constant");
const core_1 = require("@nestjs/core");
const jwt_guard_1 = require("../../guards/jwt.guard");
const auth_listener_1 = require("./listeners/auth.listener");
const auth_gateway_1 = require("./gateways/auth.gateway");
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            (0, common_1.forwardRef)(() => user_module_1.UserModule),
            jwt_1.JwtModule.register({
                global: true,
                secret: constant_1.JWT_CONSTANTS.secret,
                signOptions: constant_1.JWT_CONSTANTS.signOptions,
            }),
        ],
        controllers: [auth_controller_1.AuthController],
        providers: [
            auth_services_1.AuthService,
            auth_gateway_1.AuthGateway,
            auth_listener_1.AuthListener,
            {
                provide: core_1.APP_GUARD,
                useClass: jwt_guard_1.JwtGuard,
            },
        ],
        exports: [auth_services_1.AuthService],
    })
], AuthModule);
//# sourceMappingURL=auth.module.js.map