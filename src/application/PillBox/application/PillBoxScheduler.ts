import moment from 'moment';
import { schedule } from 'node-cron';
import DateHelper from '../../Shared/infrastructure/Date/DateHelper';
import PillBoxLeds, { ValidSections } from '../../Shared/infrastructure/GPiO/components/PillBoxLeds';
import PillBoxConfiguration from '../domain/PillBox';
import { defaultConfiguration } from './ConfigurationGetter';
import ConfigurationGetter from './ConfigurationGetter';
import Logger from '../../Shared/domain/Logger/Logger';
import IoTDeviceDataAPI from '../../Shared/infrastructure/Requests/IoTDeviceDataAPI';
export default class PillBoxScheduler {
    private readonly logger: Logger;
    private currentSectionActive: number;
    private readonly pillBoxLeds: PillBoxLeds;
    private pillBoxConfiguration: PillBoxConfiguration;

    constructor(
        logger: Logger,
        pillBoxLeds: PillBoxLeds
    ) {
        this.logger = logger;
        this.pillBoxLeds = pillBoxLeds;
        this.currentSectionActive = -1;
        this.pillBoxConfiguration = new PillBoxConfiguration(defaultConfiguration);
    }

    public run = async () => {
        await this.retrievePillBoxConfiguration();
        this.activateSectionIfHourIsPast();
        schedule('* * * * * ', async () => {
            await this.retrievePillBoxConfiguration();
            this.activateSectionIfHourIsPast();
        })
    }

    private retrievePillBoxConfiguration = async () => {
        this.pillBoxConfiguration = await new ConfigurationGetter(
            this.logger
        ).run();
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
        const firstSectionKey: ValidSections =  (2 * DateHelper.getCurrentDayOfTheWeek() + 1 as ValidSections);
        const secondSectionKey: ValidSections = (firstSectionKey + 1 as ValidSections);
        //Si aun no se cumple la fecha de la primera seccion
        if(currentDate < firstSectionDate)
            return;
        //First section turns on
        if(currentDate >= firstSectionDate && currentDate < secondSectionDate) {
            console.log('Turning on first section');
            this.pillBoxLeds.turnAllOf();
            this.pillBoxLeds.turnOnSection(firstSectionKey);
            this.currentSectionActive = firstSectionKey;
            this.updateActiveKeyAndEmmitEvent(firstSectionKey);       
        }
        if(currentDate >= secondSectionDate) {
            console.log('Turning on second section');
            this.pillBoxLeds.turnAllOf();
            this.pillBoxLeds.turnOnSection(secondSectionKey);
            this.updateActiveKeyAndEmmitEvent(secondSectionKey);
        }
    }

    private updateActiveKeyAndEmmitEvent = async (activeKey: ValidSections) => {
        if(activeKey !== this.currentSectionActive)
            await new IoTDeviceDataAPI(this.logger).postData(
                'CurrentDosis',
                {
                    section: activeKey,
                    schedule: this.pillBoxConfiguration
                }
            )
        this.currentSectionActive = activeKey;
    }
}

