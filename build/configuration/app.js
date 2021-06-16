"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
dotenv_1.config();
exports.default = {
    serverUrl: process.env.SERVER_URL || 'localhost',
    authToken: process.env.AUTH_TOKEN || '',
    locationApiKey: process.env.LOCATION_API_KEY || '',
    refreshInterval: process.env.REFRESH_INTERVAL
        ? Number(process.env.REFRESH_INTERVAL) * 60 * 1000
        : 60000 //Every minute by default
};
