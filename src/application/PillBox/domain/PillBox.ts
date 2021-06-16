import DateHelper from "../../Shared/infrastructure/Date/DateHelper";


export default class PillBoxConfiguration {
    private readonly sectionsSchedule: SectionsSchedule;

    constructor(sectionsSchedule: SectionsSchedule) {
        this.sectionsSchedule = sectionsSchedule;
    }

    getCurrentSections = () => {
        const dayOfTheWeek = DateHelper.getCurrentDayOfTheWeek();
        const initialSection = 2 * dayOfTheWeek;
        return [ this.sectionsSchedule[initialSection], this.sectionsSchedule[initialSection + 1] ];
    }
}

export interface SectionsSchedule {
    [section: number]: string;
}