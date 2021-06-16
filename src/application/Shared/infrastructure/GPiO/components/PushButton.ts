import GPiOManager from '../GPiOManager';


export default class PushButton extends GPiOManager {
    constructor(pin: number) {
        super(pin, 'in', 'both', {
            debounceTimeout: 50
        });
    }

    onPress = (callback: Function | AsyncHandler) => {
        this.watch(async (error, value) => {
            if(error)
                return Promise.reject();
            if(value === 1)
                await callback();
        });
    }
}

type AsyncHandler = () => Promise<any>;