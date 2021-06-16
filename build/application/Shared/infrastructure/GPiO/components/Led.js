"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const GPiOManager_1 = __importDefault(require("../GPiOManager"));
class Led extends GPiOManager_1.default {
    constructor(pin) {
        super(pin, 'out');
    }
}
exports.default = Led;
