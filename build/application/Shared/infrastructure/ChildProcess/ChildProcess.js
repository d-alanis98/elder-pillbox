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
const child_process_1 = require("child_process");
class CommandExecutor {
    constructor(command) {
        this.execute = () => __awaiter(this, void 0, void 0, function* () {
            try {
                const child = child_process_1.exec(this.command);
                this.listenForData(child);
                yield this.childProcessResolution(child);
                return this.result;
            }
            catch (error) {
                return Promise.reject(error);
            }
        });
        this.listenForData = (child) => {
            var _a;
            (_a = child.stdout) === null || _a === void 0 ? void 0 : _a.on('data', data => this.result = data);
        };
        this.childProcessResolution = (child) => new Promise((resolve, reject) => {
            child.addListener('error', reject);
            child.addListener('exit', (code, _) => (code === 0 ? resolve() : reject(new Error(`Exited woth code ${code}`))));
        });
        this.result = '';
        this.command = command;
    }
}
exports.default = CommandExecutor;
