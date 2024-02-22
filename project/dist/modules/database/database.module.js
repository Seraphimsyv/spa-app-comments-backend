"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const constant_1 = require("../../common/constant");
const comment_entity_1 = require("../comment/entities/comment.entity");
let DatabaseModule = class DatabaseModule {
};
exports.DatabaseModule = DatabaseModule;
exports.DatabaseModule = DatabaseModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRootAsync({
                useFactory: () => {
                    return {
                        type: 'postgres',
                        host: constant_1.POSTGRES_CONSTANTS.HOST,
                        port: constant_1.POSTGRES_CONSTANTS.PORT,
                        username: constant_1.POSTGRES_CONSTANTS.USER,
                        password: constant_1.POSTGRES_CONSTANTS.PASSWORD,
                        database: constant_1.POSTGRES_CONSTANTS.NAME,
                        entities: ['dist/**/*.entity{.ts,.js}'],
                        synchronize: true,
                    };
                },
            }),
            typeorm_1.TypeOrmModule.forFeature([comment_entity_1.Comment]),
        ],
    })
], DatabaseModule);
//# sourceMappingURL=database.module.js.map