"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PasswordHtppInterceptor = void 0;
const common_1 = require("@nestjs/common");
const operators_1 = require("rxjs/operators");
let PasswordHtppInterceptor = class PasswordHtppInterceptor {
    intercept(context, next) {
        const req = context.switchToHttp().getRequest();
        return next.handle().pipe((0, operators_1.map)(async (data) => {
            if (!req.path.includes('get/file') ||
                !req.path.includes('download/file'))
                await this.findPassword(data);
            return data;
        }));
    }
    async findPassword(obj) {
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                if (key === 'password') {
                    obj['password'] = undefined;
                }
                else if (typeof obj[key] === 'object') {
                    this.findPassword(obj[key]);
                }
            }
        }
    }
};
exports.PasswordHtppInterceptor = PasswordHtppInterceptor;
exports.PasswordHtppInterceptor = PasswordHtppInterceptor = __decorate([
    (0, common_1.Injectable)()
], PasswordHtppInterceptor);
//# sourceMappingURL=password.interceptor.js.map