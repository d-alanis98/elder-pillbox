import StatusLeds from '../GPiO/components/StatusLeds';



export default class PromiseWithLEDOutput<T = any> {
    private readonly promise?: Promise<T>;
    //LEDS
    public readonly statusLeds: StatusLeds;

    constructor(executor?: Executor<T>) {
        if(executor)
            this.promise = new Promise<T>(executor);
        //We set the LEDS, indicating the pins (17 for success LED, 27 for pending LED and 22 for failure LED)
        this.statusLeds = new StatusLeds(17, 27, 22);
        //We start with all of the off
        this.statusLeds.turnAllOff();
        //We turn on the pending LED
        this.statusLeds.pending();
    }

    public then = (onFullfilled?: ResolveFunction<T>) => (
        this.promise?.then((value: T) => {
            //We indicate success with the LED's
            this.indicateSuccess();
            //We execute the given handler
            onFullfilled?.(value);
        }) 
    );

    public catch = (onRejected?: RejectFunction) => {
        this.promise?.catch(error => {
            //We indicate the failure with the LED's
            this.indicateFailure();
            //We execute the given handler
            onRejected?.(error);
        });
    }


    public executeAsyncCallback = async (callback: AsyncCallback<T>) => {
        try {
            const result = await callback();
            //We indicate the success result
            this.indicateSuccess()
            //We return the result
            return result;
        } catch(error) {
            //We indicate the failure
            this.indicateFailure();
            return Promise.reject(error);
        }
    }

    static timeout = (time: number) => new Promise(resolve => setTimeout(resolve, time));

    //Internal helpers

    private indicateFailure = () => {
        this.statusLeds.turnAllOff();
        this.statusLeds.failure();
    }

    private indicateSuccess = () => {
        this.statusLeds.turnAllOff();
        this.statusLeds.success();
    }



}

//Types
type ResolveFunction<T> = (value: T) => void;
type RejectFunction = (reason?: any) => void;
type Executor<T> = (resolve: ResolveFunction<T>, reject: RejectFunction) => void;
type AsyncCallback<T> = () => Promise<T>;