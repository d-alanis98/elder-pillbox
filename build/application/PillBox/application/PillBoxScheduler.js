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
const node_cron_1 = require("node-cron");
const DateHelper_1 = __importDefault(require("../../Shared/infrastructure/Date/DateHelper"));
const PillBox_1 = __importDefault(require("../domain/PillBox"));
const ConfigurationGetter_1 = require("./ConfigurationGetter");
const ConfigurationGetter_2 = __importDefault(require("./ConfigurationGetter"));
class PillBoxScheduler {
    constructor(logger, pillBoxLeds) {
        this.run = () => __awaiter(this, void 0, void 0, function* () {
            yield this.retrievePillBoxConfiguration();
            this.activateSectionIfHourIsPast();
            node_cron_1.schedule('* * * * * ', () => __awaiter(this, void 0, void 0, function* () {
                yield this.retrievePillBoxConfiguration();
                this.activateSectionIfHourIsPast();
            }));
        });
        this.retrievePillBoxConfiguration = () => __awaiter(this, void 0, void 0, function* () {
            this.pillBoxConfiguration = yield new ConfigurationGetter_2.default(this.logger).run();
        });
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
            const firstSectionKey = 2 * DateHelper_1.default.getCurrentDayOfTheWeek() + 1;
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
        this.logger = logger;
        this.pillBoxLeds = pillBoxLeds;
        this.pillBoxConfiguration = new PillBox_1.default(ConfigurationGetter_1.defaultConfiguration);
    }
}
exports.default = PillBoxScheduler;
