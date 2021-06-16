"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_cron_1 = require("node-cron");
const DateHelper_1 = __importDefault(require("../../Shared/infrastructure/Date/DateHelper"));
class PillBoxScheduler {
    constructor(pillBoxLeds, pillBoxConfiguration) {
        this.run = () => {
            this.activateSectionIfHourIsPast();
            node_cron_1.schedule('* * * * * ', () => {
                this.activateSectionIfHourIsPast();
            });
        };
        this.getDatesFromCurrentSections = () => {
            const [firstSectionHour, secondSectionHour] = this.pillBoxConfiguration.getCurrentSections();
            //We get the dates
            const firstSectionDate = DateHelper_1.default.getCurrentDateWithTimeFromString(firstSectionHour).getTime();
            const secondSectionDate = DateHelper_1.default.getCurrentDateWithTimeFromString(secondSectionHour).getTime();
            //We log the value
            return { firstSectionDate, secondSectionDate };
        };
        this.activateSectionIfHourIsPast = () => {
            const { firstSectionDate, secondSectionDate } = this.getDatesFromCurrentSections();
            const currentDate = new Date().getTime();
            //We get the section keys
            const firstSectionKey = 2 * DateHelper_1.default.getCurrentDayOfTheWeek();
            const secondSectionKey = firstSectionKey + 1;
            //Si aun no se cumple la fecha de la primera seccion
            if (currentDate < firstSectionDate)
                return;
            //First section turns on
            if (currentDate >= firstSectionDate && currentDate < secondSectionDate) {
                console.log('Turning on first section');
                this.pillBoxLeds.turnAllOf();
                this.pillBoxLeds.turnOnSection(firstSectionKey);
            }
            if (currentDate >= secondSectionDate) {
                console.log('Turning on second section');
                this.pillBoxLeds.turnAllOf();
                this.pillBoxLeds.turnOnSection(secondSectionKey);
            }
        };
        this.pillBoxLeds = pillBoxLeds;
        this.pillBoxConfiguration = pillBoxConfiguration;
    }
}
exports.default = PillBoxScheduler;
