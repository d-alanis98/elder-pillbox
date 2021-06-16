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
Object.defineProperty(exports, "__esModule", { value: true });
const onoff_1 = require("onoff");
class GPiOManager extends onoff_1.Gpio {
    constructor(pin, pinMode, edgeMode, options) {
        super(pin, pinMode, edgeMode, options);
        this.turnOn = () => __awaiter(this, void 0, void 0, function* () {
            yield this.write(1);
        });
        this.turnOff = () => __awaiter(this, void 0, void 0, function* () {
            yield this.write(0);
        });
        this.isOn = () => __awaiter(this, void 0, void 0, function* () { return (yield this.read()) === 1; });
        this.turnOnByTime = (time) => __awaiter(this, void 0, void 0, function* () {
            //We normalize the time
            const timeOn = time || GPiOManager.DEFAULT_TIME_ON;
            yield this.turnOn();
            //We set up a timeout to set the logic level to low after the given time
            setTimeout(() => __awaiter(this, void 0, void 0, function* () { return yield this.turnOff(); }), timeOn);
        });
    }
}
exports.default = GPiOManager;
//Constants
GPiOManager.DEFAULT_TIME_ON = 3500;
