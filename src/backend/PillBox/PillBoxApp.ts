
//Base app
import App from '../App';
import PillBoxLeds, { ValidSections } from '../../application/Shared/infrastructure/GPiO/components/PillBoxLeds';

export default class PillBoxApp extends App {
    constructor() {
        super(PillBoxApp.name);
        this.logger.info(`${PillBoxApp.name} service started`);
    }

    public start = async () => {
        try {
            //We execute the main location interval use case, to update the location every X seconds (60 by default)
            let sectionCounter: ValidSections = 1;
            const pillBoxLeds = new PillBoxLeds();
            setInterval(() => {
                pillBoxLeds.turnAllOf();
                pillBoxLeds.turnOnSection(sectionCounter);
                (sectionCounter === 14)
                    ? sectionCounter = 1
                    : sectionCounter++;

            })
        } catch(error) {
            this.logger.error(error.message);
        }
    }
}