"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractGateway = void 0;
const common_1 = require("@nestjs/common");
class AbstractGateway {
    constructor() {
        this.logger = new common_1.Logger(this.constructor.name);
    }
    afterInit() {
        this.logger.log('WebSocket server started!');
    }
    handleConnection(client) {
        this.logger.log(`Client with id: ${client.id} connected!`);
        client.join(client.id);
    }
    handleDisconnect(client) {
        this.logger.log(`Client with id: ${client.id} disconnected!`);
        client.leave(client.id);
    }
    async proccessData(data) {
        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                if (key === 'password') {
                    delete data[key];
                }
                else if (key === 'filepath' && typeof data[key] === 'string') {
                    data[key] = data[key].split('./uploads').pop();
                }
                else if (typeof data[key] === 'object') {
                    this.proccessData(data[key]);
                }
            }
        }
    }
}
exports.AbstractGateway = AbstractGateway;
//# sourceMappingURL=abstract.js.map