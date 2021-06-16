//Domain
import Logger from '../application/Shared/domain/Logger/Logger';
//Infrastructure
import WinstonLogger from '../application/Shared/infrastructure/Logger/WinstonLogger';
import AxiosRequest from '../application/Shared/infrastructure/Requests/AxiosRequest';
//Configuration
import app from '../configuration/app';


export default abstract class App {
    protected logger: Logger;

    constructor(context: string) {
        this.logger = new WinstonLogger(context);
        this.registerServices();
    }

    public abstract start(): void | Promise<void>;

    //Internal methods

    private registerServices = () => {
        //We set up the axios instance
        AxiosRequest.setInstance(app.authToken);
    }
}