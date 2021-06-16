"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = __importDefault(require("winston"));
var Levels;
(function (Levels) {
    Levels["DEBUG"] = "debug";
    Levels["ERROR"] = "error";
    Levels["INFO"] = "info";
})(Levels || (Levels = {}));
/**
 * @author Damián Alanís Ramírez
 * @version 1.2.1
 * @description Class that implements the Logger interface. It is provided via dependency injection, to act as the logger of
 * the application.
 */
class WinstonLogger {
    constructor(context) {
        this.getMessageToLog = (message) => (`[${new Date().toLocaleString()}]: ${message}`);
        this.logger = winston_1.default.createLogger({
            format: winston_1.default.format.combine(winston_1.default.format.prettyPrint(), winston_1.default.format.errors({ stack: true }), winston_1.default.format.splat(), winston_1.default.format.colorize(), winston_1.default.format.simple()),
            transports: [
                new winston_1.default.transports.Console(),
                new winston_1.default.transports.File({ filename: `logs/${context}/${Levels.DEBUG}.log`, level: Levels.DEBUG }),
                new winston_1.default.transports.File({ filename: `logs/${context}/${Levels.ERROR}.log`, level: Levels.ERROR }),
                new winston_1.default.transports.File({ filename: `logs/${context}/${Levels.INFO}.log`, level: Levels.INFO })
            ]
        });
    }
    debug(message) {
        this.logger.debug(this.getMessageToLog(message));
    }
    error(message) {
        const messageToLog = message instanceof Error
            ? message.message
            : message;
        this.logger.error(this.getMessageToLog(messageToLog));
    }
    info(message) {
        this.logger.info(this.getMessageToLog(message));
    }
}
exports.default = WinstonLogger;
