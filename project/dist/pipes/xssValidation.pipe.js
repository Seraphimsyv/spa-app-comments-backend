"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.XssValidationPipe = void 0;
const common_1 = require("@nestjs/common");
const regex_1 = require("../common/regex");
let XssValidationPipe = class XssValidationPipe {
    transform(value, metadata) {
        function circularCheckout(data) {
            for (const key in data) {
                if (Object.hasOwnProperty.call(data, key)) {
                    if (typeof data[key] === 'object') {
                        return circularCheckout(data[key]);
                    }
                    else if (typeof data[key] === 'string') {
                        if (!regex_1.HTML_REGEX.test(data[key])) {
                            throw new common_1.BadRequestException('[XSS] Invalid validation');
                        }
                    }
                }
            }
        }
        if (metadata.type === 'body') {
            circularCheckout(value);
        }
        return value;
    }
};
exports.XssValidationPipe = XssValidationPipe;
exports.XssValidationPipe = XssValidationPipe = __decorate([
    (0, common_1.Injectable)()
], XssValidationPipe);
//# sourceMappingURL=xssValidation.pipe.js.map