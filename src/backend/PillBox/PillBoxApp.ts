
//Base app
import App from '../App';


export default class PillBoxApp extends App {
    constructor() {
        super(PillBoxApp.name);
        this.logger.info(`${PillBoxApp.name} service started`);
    }

    public start = async () => {
        try {
            //We execute the main location interval use case, to update the location every X seconds (60 by default)
            console.log('Started')
        } catch(error) {
            this.logger.error(error.message);
        }
    }
}