import Led from './Led';


export default class StatusLeds {
    private readonly successLed: Led;
    private readonly pendingLed: Led;
    private readonly failureLed: Led;

    constructor(
        successLedPin: number,
        pendingLedPin: number,
        failureLedPin: number
    ) {
        this.successLed = new Led(successLedPin);
        this.pendingLed = new Led(pendingLedPin);
        this.failureLed = new Led(failureLedPin);
    }

    turnAllOff = () => {
        this.successLed.turnOff();
        this.pendingLed.turnOff();
        this.failureLed.turnOff();
    }

    success = (timeOn?: number) => this.successLed.turnOnByTime(timeOn);

    pending = () => this.pendingLed.turnOn();

    failure = (timeOn?: number) => this.failureLed.turnOnByTime(timeOn);
}