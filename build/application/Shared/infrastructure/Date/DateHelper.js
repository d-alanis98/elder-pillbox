"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const moment_1 = __importDefault(require("moment"));
class DateHelper {
}
exports.default = DateHelper;
/**
 * Method to get the ISO date from day number of the current week.
 * @param dayOfTheWeek Day of the week starting from 0 and from Sunday.
 * @returns
 */
DateHelper.getISODateFromDayOfTheWeek = (dayOfTheWeek) => {
    const dateWithNoHour = moment_1.default().day(dayOfTheWeek).toDate().setHours(0, 0, 0);
    return new Date(dateWithNoHour).toISOString();
};
DateHelper.getCurrentDayOfTheWeek = () => moment_1.default().day();
DateHelper.getCurrentDateWithTimeFromString = (timeString) => {
    const date = moment_1.default();
    const time = moment_1.default(timeString, 'HH:mm');
    date.set({
        hour: time.get('hour'),
        minute: time.get('minute'),
        second: time.get('second'),
    });
    return new Date(date.toLocaleString());
};
