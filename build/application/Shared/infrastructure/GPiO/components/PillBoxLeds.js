"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Led_1 = __importDefault(require("./Led"));
class PillBoxLeds {
    constructor() {
        this.turnAllOf = () => {
            this.leds.forEach(led => led.turnOff());
        };
        this.turnOnSection = (section) => (this.toggleSection(section, true));
        this.turnOffSection = (section) => (this.toggleSection(section, false));
        this.toggleSection = (section, turnSectionOn = false) => {
            const sectionIndex = section - 1;
            //We get the led
            const led = this.leds[sectionIndex];
            //We apply the operation
            return turnSectionOn
                ? led.turnOn()
                : led.turnOff();
        };
        this.leds = Object.values(PillBoxLeds.sectionsPinsDictionary)
            .map(ledPin => new Led_1.default(ledPin));
    }
}
exports.default = PillBoxLeds;
PillBoxLeds.sectionsPinsDictionary = {
    1: 4, 2: 18,
    3: 17, 4: 23,
    5: 27, 6: 24,
    7: 22, 8: 25,
    9: 13, 10: 12,
    11: 19, 12: 16,
    13: 26, 14: 20
};
