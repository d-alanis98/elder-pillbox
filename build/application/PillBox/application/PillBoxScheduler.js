"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const moment_1 = __importDefault(require("moment"));
const node_cron_1 = require("node-cron");
class PillBoxScheduler {
    constructor() {
        this.run = () => {
            node_cron_1.schedule('* * * * * ', () => {
                const dateToCompare = '2021-06-15T01:10:00';
                if (this.dateIsInThePast(dateToCompare))
                    console.log('Date has passed');
                else
                    console.log('Date has nos passed');
            });
        };
        this.dateIsInThePast = (dateISOString) => {
            return moment_1.default(new Date().toISOString()).isAfter(dateISOString);
        };
    }
}
exports.default = PillBoxScheduler;
