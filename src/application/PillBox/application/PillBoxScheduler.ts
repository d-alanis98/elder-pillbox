import moment from 'moment';
import { schedule } from 'node-cron';
import DateHelper from '../../Shared/infrastructure/Date/DateHelper';
import PillBoxLeds, { ValidSections } from '../../Shared/infrastructure/GPiO/components/PillBoxLeds';
import PillBoxConfiguration from '../domain/PillBox';


export default class PillBoxScheduler {
    private readonly pillBoxLeds: PillBoxLeds;
    private readonly pillBoxConfiguration: PillBoxConfiguration;

    constructor(
        pillBoxLeds: PillBoxLeds,
        pillBoxConfiguration: PillBoxConfiguration
    ) {
        this.pillBoxLeds = pillBoxLeds;
        this.pillBoxConfiguration = pillBoxConfiguration;
    }

    public run = () => {
        
        this.activateSectionIfHourIsPast();
        schedule('* * * * * ', () => {
            this.activateSectionIfHourIsPast();
        })
    }

    private getDatesFromCurrentSections = () => {
        const [firstSectionHour, secondSectionHour] = this.pillBoxConfiguration.getCurrentSections();
        //We get the dates
        const firstSectionDate = DateHelper.getCurrentDateWithTimeFromString(firstSectionHour);
        const secondSectionDate = DateHelper.getCurrentDateWithTimeFromString(secondSectionHour);
        //We log the value
        return { firstSectionDate, secondSectionDate };
    }

    private activateSectionIfHourIsPast = () => {
        const { firstSectionDate, secondSectionDate } = this.getDatesFromCurrentSections();
        const currentDate = new Date();
        //We get the section keys
        const firstSectionKey: ValidSections =  (2 * DateHelper.getCurrentDayOfTheWeek() as ValidSections);
        const secondSectionKey: ValidSections = (firstSectionKey + 1 as ValidSections);
        //Si aun no se cumple la fecha de la primera seccion
        if(firstSectionDate > currentDate)
            return;
        if(firstSectionDate <= currentDate && secondSectionDate > currentDate) {
            this.pillBoxLeds.turnAllOf();
            this.pillBoxLeds.turnOnSection(firstSectionKey);        
        }
        if(firstSectionDate < currentDate && secondSectionDate <= currentDate) {
            this.pillBoxLeds.turnAllOf();
            this.pillBoxLeds.turnOnSection(secondSectionKey);
        }
    }
}

