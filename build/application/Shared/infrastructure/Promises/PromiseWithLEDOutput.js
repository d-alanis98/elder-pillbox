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
const StatusLeds_1 = __importDefault(require("../GPiO/components/StatusLeds"));
class PromiseWithLEDOutput {
    constructor(executor) {
        this.then = (onFullfilled) => {
            var _a;
            return ((_a = this.promise) === null || _a === void 0 ? void 0 : _a.then((value) => {
                //We indicate success with the LED's
                this.indicateSuccess();
                //We execute the given handler
                onFullfilled === null || onFullfilled === void 0 ? void 0 : onFullfilled(value);
            }));
        };
        this.catch = (onRejected) => {
            var _a;
            (_a = this.promise) === null || _a === void 0 ? void 0 : _a.catch(error => {
                //We indicate the failure with the LED's
                this.indicateFailure();
                //We execute the given handler
                onRejected === null || onRejected === void 0 ? void 0 : onRejected(error);
            });
        };
        this.executeAsyncCallback = (callback) => __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield callback();
                //We indicate the success result
                this.indicateSuccess();
                //We return the result
                return result;
            }
            catch (error) {
                //We indicate the failure
                this.indicateFailure();
                return Promise.reject(error);
            }
        });
        //Internal helpers
        this.indicateFailure = () => {
            this.statusLeds.turnAllOff();
            this.statusLeds.failure();
        };
        this.indicateSuccess = () => {
            this.statusLeds.turnAllOff();
            this.statusLeds.success();
        };
        if (executor)
            this.promise = new Promise(executor);
        //We set the LEDS, indicating the pins (17 for success LED, 27 for pending LED and 22 for failure LED)
        this.statusLeds = new StatusLeds_1.default(17, 27, 22);
        //We start with all of the off
        this.statusLeds.turnAllOff();
        //We turn on the pending LED
        this.statusLeds.pending();
    }
}
exports.default = PromiseWithLEDOutput;
PromiseWithLEDOutput.timeout = (time) => new Promise(resolve => setTimeout(resolve, time));
