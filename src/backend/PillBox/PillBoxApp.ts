
//Base app
import App from '../App';
import PillBoxLeds from '../../application/Shared/infrastructure/GPiO/components/PillBoxLeds';
import PillBoxConfiguration from '../../application/PillBox/domain/PillBox';
import PillBoxScheduler from '../../application/PillBox/application/PillBoxScheduler';

export default class PillBoxApp extends App {
    constructor() {
        super(PillBoxApp.name);
        this.logger.info(`${PillBoxApp.name} service started`);
    }

    public start = async () => {
        try {
            const pillBoxLeds = new PillBoxLeds();
            pillBoxLeds.turnAllOf();
            //We execute the main location interval use case, to update the location every X seconds (60 by default)
            new PillBoxScheduler(
                pillBoxLeds,
                new PillBoxConfiguration(mockData)
            ).run();
        } catch(error) {
            this.logger.error(error.message);
        }
    }
}

const mockData = {
    0: '08:30', 1: '18:30',
    2: '08:30', 3: '18:30',
    4: '09:30', 5: '19:30',
    6: '08:30', 7: '18:30',
    8: '08:30', 9: '18:30',
    10: '08:30', 11: '18:30',
    12: '08:30', 13: '18:30',
}