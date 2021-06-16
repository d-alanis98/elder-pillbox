import { ChildProcess, exec } from 'child_process';

export default class CommandExecutor {
    private result: string;
    private readonly command: string;

    constructor(command: string) {
        this.result = '';
        this.command = command;
    }  

    public execute = async (): Promise<string> => {
        try {
            const child = exec(this.command);
            this.listenForData(child);
            await this.childProcessResolution(child);
            return this.result;
        } catch(error) {
            return Promise.reject(error);
        }
    }

    private listenForData = (child: ChildProcess) => {
        child.stdout?.on('data', data => this.result = data);
    }

    private childProcessResolution = (child: ChildProcess) => new Promise<void>((resolve, reject)  => {
        child.addListener('error', reject);
        child.addListener('exit', (code, _) => (
            code === 0 ? resolve() : reject(new Error(`Exited woth code ${ code }`))
        ));
    });
}