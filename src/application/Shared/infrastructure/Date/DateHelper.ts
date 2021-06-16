import moment from "moment";



export default class DateHelper {
    /**
     * Method to get the ISO date from day number of the current week. 
     * @param dayOfTheWeek Day of the week starting from 0 and from Sunday.
     * @returns 
     */
    static getISODateFromDayOfTheWeek = (dayOfTheWeek: DayOfTheWeek) => {
        const dateWithNoHour = moment().day(dayOfTheWeek).toDate().setHours(0,0,0);
        return new Date(dateWithNoHour).toISOString();
    }

    static getCurrentDayOfTheWeek = () => moment().day();

    static getCurrentDateWithTimeFromString = (timeString: string) => {
        const date = moment();
        const time = moment(timeString, 'HH:mm');

        date.set({
            hour: time.get('hour'),
            minute: time.get('minute'),
            second: time.get('second'),
            
        })

        return new Date(date.toLocaleString());
    }
}

type DayOfTheWeek = 0|1|2|3|4|5|6;