import moment from 'moment';
import { schedule } from 'node-cron';


export default class PillBoxScheduler {

    public run = () => {
        schedule('* * * * * ', () => {
            const dateToCompare = '2021-06-16T01:27:00';
            if(this.dateIsInThePast(dateToCompare))
                console.log('Date has passed')
            else console.log('Date has nos passed')
        })
    }

    private dateIsInThePast = (dateISOString: string) => {

        return moment(new Date().toISOString()).isAfter(dateISOString);
    }
}