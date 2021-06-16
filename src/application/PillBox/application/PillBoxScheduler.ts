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
        const firstSectionDate = DateHelper.getCurrentDateWithTimeFromString(firstSectionHour).getTime();
        const secondSectionDate = DateHelper.getCurrentDateWithTimeFromString(secondSectionHour).getTime();
        //We log the value
        return { firstSectionDate, secondSectionDate };
    }

    private activateSectionIfHourIsPast = () => {
        const { firstSectionDate, secondSectionDate } = this.getDatesFromCurrentSections();
        const currentDate = new Date().getTime();
        //We get the section keys
        const firstSectionKey: ValidSections =  (2 * DateHelper.getCurrentDayOfTheWeek() as ValidSections);
        const secondSectionKey: ValidSections = (firstSectionKey + 1 as ValidSections);
        //Si aun no se cumple la fecha de la primera seccion
        if(currentDate < firstSectionDate)
            return;
        //First section turns on
        if(currentDate >= firstSectionDate && currentDate < secondSectionDate) {
            console.log('Turning on first section');
            this.pillBoxLeds.turnAllOf();
            this.pillBoxLeds.turnOnSection(firstSectionKey);        
        }
        if(currentDate >= secondSectionDate) {
            console.log('Turning on second section');
            this.pillBoxLeds.turnAllOf();
            this.pillBoxLeds.turnOnSection(secondSectionKey);
        }
    }
}

