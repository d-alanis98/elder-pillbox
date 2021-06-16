"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Led_1 = __importDefault(require("./Led"));
class StatusLeds {
    constructor(successLedPin, pendingLedPin, failureLedPin) {
        this.turnAllOff = () => {
            this.successLed.turnOff();
            this.pendingLed.turnOff();
            this.failureLed.turnOff();
        };
        this.success = (timeOn) => this.successLed.turnOnByTime(timeOn);
        this.pending = () => this.pendingLed.turnOn();
        this.failure = (timeOn) => this.failureLed.turnOnByTime(timeOn);
        this.successLed = new Led_1.default(successLedPin);
        this.pendingLed = new Led_1.default(pendingLedPin);
        this.failureLed = new Led_1.default(failureLedPin);
    }
}
exports.default = StatusLeds;
