import Logger from "../../Shared/domain/Logger/Logger";
import AxiosRequest from "../../Shared/infrastructure/Requests/AxiosRequest";
import PillBoxConfiguration from "../domain/PillBox";



export default class ConfigurationGetter {
    private logger: Logger;
    private configuration: PillBoxConfiguration;

    constructor(
        logger: Logger
    ) {
        this.logger = logger;
        this.configuration = new PillBoxConfiguration(defaultConfiguration);
    }

    run = async () => {
        try {
            const response = await AxiosRequest.get('/iot/device');
            const deviceData = response?.data;
            console.log(deviceData)
            if(deviceData?.configuration)
                this.configuration = new PillBoxConfiguration(deviceData.configuration);
            return this.configuration;
        } catch(error) {
            return Promise.reject(error.message);
        }
    }
}

export const defaultConfiguration = {
    0: '08:30', 1: '18:30',
    2: '08:30', 3: '18:30',
    4: '09:30', 5: '22:26',
    6: '08:30', 7: '18:30',
    8: '08:30', 9: '18:30',
    10: '08:30', 11: '18:30',
    12: '08:30', 13: '18:30',
}