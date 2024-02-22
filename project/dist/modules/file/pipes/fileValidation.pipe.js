"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileValidationPipe = void 0;
const common_1 = require("@nestjs/common");
const mimeTypes = require("mime-types");
const utils_1 = require("../../../common/utils");
let FileValidationPipe = class FileValidationPipe {
    async transform(value) {
        if (value && value.fieldname) {
            const file = value;
            const fileMimeType = file.mimetype
                ? file.mimetype
                : mimeTypes.lookup(file.originalname);
            try {
                const isValid = await (0, utils_1.validationFile)({
                    mimetype: fileMimeType,
                    size: file.size,
                });
                if (isValid)
                    return value;
            }
            catch (err) {
                throw new common_1.BadRequestException(err.message);
            }
        }
        else {
            return value;
        }
    }
};
exports.FileValidationPipe = FileValidationPipe;
exports.FileValidationPipe = FileValidationPipe = __decorate([
    (0, common_1.Injectable)()
], FileValidationPipe);
//# sourceMappingURL=fileValidation.pipe.js.map