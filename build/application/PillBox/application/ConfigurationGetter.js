"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultConfiguration = void 0;
const AxiosRequest_1 = __importDefault(require("../../Shared/infrastructure/Requests/AxiosRequest"));
const PillBox_1 = __importDefault(require("../domain/PillBox"));
class ConfigurationGetter {
    constructor(logger) {
        this.run = () => __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield AxiosRequest_1.default.get('/iot/device');
                const deviceData = response === null || response === void 0 ? void 0 : response.data;
                if (deviceData === null || deviceData === void 0 ? void 0 : deviceData.configuration)
                    this.configuration = new PillBox_1.default(deviceData.configuration);
                return this.configuration;
            }
            catch (error) {
                return Promise.reject(error.message);
            }
        });
        this.logger = logger;
        this.configuration = new PillBox_1.default(exports.defaultConfiguration);
    }
}
exports.default = ConfigurationGetter;
exports.defaultConfiguration = {
    0: '08:30', 1: '18:30',
    2: '08:30', 3: '18:30',
    4: '09:30', 5: '22:26',
    6: '08:30', 7: '18:30',
    8: '08:30', 9: '18:30',
    10: '08:30', 11: '18:30',
    12: '08:30', 13: '18:30',
};
