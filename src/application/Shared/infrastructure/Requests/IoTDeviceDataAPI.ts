import FormData from 'form-data';
import { AxiosRequestConfig } from 'axios';
//Domain
import Logger from '../../domain/Logger/Logger';
//Request manager
import AxiosRequest from './AxiosRequest';


export default class IoTDeviceDataAPI {
    private readonly logger: Logger;

    constructor(logger: Logger) {
        this.logger = logger;
    }

    public postData = async (
        key: string, 
        data: IoTDeviceDataRequest, 
        configuration?: AxiosRequestConfig
    ) => {
        try {
            const response = await AxiosRequest.post(
                '/iot/device/data',
                { 
                    key, 
                    value: data
                },
                configuration
            );
            const deviceDataCreated = response.data;
            this.logger.info(`[${ deviceDataCreated.key }] data sent successfully.`);
        } catch(error) {
            this.logger.error(error.message);
        }
    }
}

type IoTDeviceDataRequest = FormData | Object ;