import { config } from 'dotenv';

config();

export default {
    serverUrl: process.env.SERVER_URL || 'localhost',
    authToken: process.env.AUTH_TOKEN || '',
    locationApiKey: process.env.LOCATION_API_KEY || '',
    refreshInterval: process.env.REFRESH_INTERVAL 
        ? Number(process.env.REFRESH_INTERVAL) * 60 * 1000
        : 60_000 //Every minute by default
}