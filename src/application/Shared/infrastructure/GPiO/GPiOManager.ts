import { Gpio, Direction, Edge, Options } from 'onoff';

export default class GPiOManager extends Gpio {
    //Constants
    static readonly DEFAULT_TIME_ON = 3500;

    constructor(
        pin: number,
        pinMode: Direction,
        edgeMode?: Edge,
        options?: Options
    ) {
        super(pin, pinMode, edgeMode, options);
    }

    turnOn = async () => {
        await this.write(1);
    }

    turnOff = async () => {
        await this.write(0);
    }

    isOn = async () => await this.read() === 1;

    turnOnByTime = async (time?: number) => {
        //We normalize the time
        const timeOn = time || GPiOManager.DEFAULT_TIME_ON; 
        await this.turnOn();
        //We set up a timeout to set the logic level to low after the given time
        setTimeout(async () => await this.turnOff(), timeOn);
    }

}
