
//Base app
import App from '../App';
import PillBoxLeds from '../../application/Shared/infrastructure/GPiO/components/PillBoxLeds';
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
                this.logger,
                pillBoxLeds
            ).run();
        } catch(error) {
            this.logger.error(error.message);
        }
    }
}
