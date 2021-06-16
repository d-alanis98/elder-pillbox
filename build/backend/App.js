"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//Infrastructure
const WinstonLogger_1 = __importDefault(require("../application/Shared/infrastructure/Logger/WinstonLogger"));
const AxiosRequest_1 = __importDefault(require("../application/Shared/infrastructure/Requests/AxiosRequest"));
//Configuration
const app_1 = __importDefault(require("../configuration/app"));
class App {
    constructor(context) {
        //Internal methods
        this.registerServices = () => {
            //We set up the axios instance
            AxiosRequest_1.default.setInstance(app_1.default.authToken);
        };
        this.logger = new WinstonLogger_1.default(context);
        this.registerServices();
    }
}
exports.default = App;
