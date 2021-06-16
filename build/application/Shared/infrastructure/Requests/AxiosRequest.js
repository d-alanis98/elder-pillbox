"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
class AxiosRequest {
    constructor(authToken) {
        AxiosRequest.setInstance(authToken);
    }
}
exports.default = AxiosRequest;
AxiosRequest.setInstance = (authToken) => {
    if (!AxiosRequest.instance)
        AxiosRequest.instance = axios_1.default.create({
            baseURL: process.env.SERVER_URL
        });
    AxiosRequest.setInterceptors();
    AxiosRequest.authToken = authToken;
};
AxiosRequest.get = (url, configuration) => __awaiter(void 0, void 0, void 0, function* () {
    return (AxiosRequest.instance.get(url, configuration));
});
AxiosRequest.post = (url, data, configuration) => __awaiter(void 0, void 0, void 0, function* () {
    return (AxiosRequest.instance.post(url, data, configuration));
});
AxiosRequest.put = (url, data, configuration) => __awaiter(void 0, void 0, void 0, function* () {
    return (AxiosRequest.instance.put(url, data, configuration));
});
AxiosRequest.delete = (url, configuration) => __awaiter(void 0, void 0, void 0, function* () {
    return (AxiosRequest.instance.delete(url, configuration));
});
AxiosRequest.setInterceptors = () => {
    AxiosRequest.instance.interceptors.request.use(
    //On successfull requests we provide the request handler to attach the authorization token as a header
    AxiosRequest.requestHandler, 
    //On error we simply reject the promise
    (error) => Promise.reject(error));
};
AxiosRequest.requestHandler = (request) => {
    const { authToken } = AxiosRequest;
    //We attach the authorization headers
    request.headers['Authorization'] = `Bearer ${authToken}`;
    return request;
};
