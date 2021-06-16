import Axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';

export default class AxiosRequest {
    private static instance: AxiosInstance;
    private static authToken: string;

    constructor(authToken: string) {
        AxiosRequest.setInstance(authToken);
    }

    static setInstance = (authToken: string) => {
        if(!AxiosRequest.instance)
            AxiosRequest.instance = Axios.create({
                baseURL: process.env.SERVER_URL
            });
        AxiosRequest.setInterceptors();
        AxiosRequest.authToken = authToken;
    }

    static get = async (url: string, configuration?: AxiosRequestConfig): Promise<AxiosRequestConfig> => (
        AxiosRequest.instance.get(url, configuration)
    );

    static post = async (url: string, data?: any, configuration?: AxiosRequestConfig): Promise<AxiosRequestConfig> => (
        AxiosRequest.instance.post(url, data, configuration)
    );

    static put = async (url: string, data?: any, configuration?: AxiosRequestConfig): Promise<AxiosRequestConfig> => (
        AxiosRequest.instance.put(url, data, configuration)
    );

    static delete = async (url: string, configuration?: AxiosRequestConfig): Promise<AxiosRequestConfig> => (
        AxiosRequest.instance.delete(url, configuration)
    );

    static setInterceptors = () => {
        AxiosRequest.instance.interceptors.request.use(
            //On successfull requests we provide the request handler to attach the authorization token as a header
            AxiosRequest.requestHandler,
            //On error we simply reject the promise
            (error: AxiosError) => Promise.reject(error)
        );
    }

    static requestHandler = (request: AxiosRequestConfig): AxiosRequestConfig | Promise<AxiosRequestConfig> => {
        const { authToken } = AxiosRequest;
        //We attach the authorization headers
        request.headers['Authorization'] = `Bearer ${ authToken }`;

        return request;
    }
}