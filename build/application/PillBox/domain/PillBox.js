"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const DateHelper_1 = __importDefault(require("../../Shared/infrastructure/Date/DateHelper"));
class PillBoxConfiguration {
    constructor(sectionsSchedule) {
        this.getCurrentSections = () => {
            const dayOfTheWeek = DateHelper_1.default.getCurrentDayOfTheWeek();
            const initialSection = 2 * dayOfTheWeek;
            return [this.sectionsSchedule[initialSection], this.sectionsSchedule[initialSection + 1]];
        };
        this.sectionsSchedule = sectionsSchedule;
    }
}
exports.default = PillBoxConfiguration;
