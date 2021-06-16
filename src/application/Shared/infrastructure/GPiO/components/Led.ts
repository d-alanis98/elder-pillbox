import GPiOManager from '../GPiOManager';


export default class Led extends GPiOManager {

    constructor(pin: number) {
        super(pin, 'out');
    }

}