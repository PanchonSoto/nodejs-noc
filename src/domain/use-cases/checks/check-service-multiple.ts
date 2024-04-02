import { LogEntity, LogSeverityLevel } from "../../entities/log.entity";
import { LogRepository } from "../../repository/log.repository";

interface CheckServiceMultipleUseCase {
    execute(url:string):Promise<boolean>;
}

type SucessCallback = () => void;
type ErrorCallback = (error:string) => void;

export class CheckServiceMultiple implements CheckServiceMultipleUseCase {

    constructor(
        private readonly logRepository: LogRepository[],
        private readonly successCallback: SucessCallback,
        private readonly errorCallback: ErrorCallback
    ){}

    private callLogs(log:LogEntity) {
        this.logRepository.forEach(logRepo=>{
            logRepo.saveLog(log);
        });
    }

    public async execute(url:string):Promise<boolean> {
        try {
            const req = await fetch(url);
            if(!req.ok) {
                throw new Error(`Error on check service ${url}`);
            }
            const log = new LogEntity({
                message: `Service ${url} working`,
                level: LogSeverityLevel.low,
                origin: 'check-service.ts'
            });
            this.callLogs(log);
            this.successCallback();
            return true;

        } catch (error) {
            const errorMsg = `${url} is not ok. ${error}`;
            const log = new LogEntity({
                message:errorMsg, 
                level:LogSeverityLevel.high,
                origin: 'check-service.ts'
            });
            this.callLogs(log);
            this.errorCallback(`${error}`);
            return false;

        }

    }

}