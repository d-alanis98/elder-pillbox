import Led from './Led'


export default class PillBoxLeds {
    public static readonly sectionsPinsDictionary = {
        1: 4,   2: 18,
        3: 17,  4: 23,
        5: 27,  6: 24,
        7: 22,  8: 25,
        9: 13,  10: 12,
        11: 19, 12: 16,
        13: 26, 14: 20
    }

    private readonly leds: Led[];

    constructor() {
        this.leds = Object.values(PillBoxLeds.sectionsPinsDictionary)
            .map(ledPin => new Led(ledPin));
    }

    public turnAllOf = () => {
        this.leds.forEach(led => led.turnOff());
    }

    public turnOnSection = (section: ValidSections) => (
        this.toggleSection(section, true)
    )

    public turnOffSection = (section: ValidSections) => (
        this.toggleSection(section, false)
    )

    public toggleSection = (
        section: ValidSections,
        turnSectionOn: boolean = false
    ) => {
        const sectionIndex = section - 1;
        //We get the led
        const led = this.leds[sectionIndex];
        //We apply the operation
        return turnSectionOn
            ? led.turnOn()
            : led.turnOff();
    }



}

export type ValidSections = 1|2|3|4|5|6|7|8|9|10|11|12|13|14;