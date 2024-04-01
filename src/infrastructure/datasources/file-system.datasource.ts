import fs from 'fs';
import { LogDataSource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";



export class FileSystemDataSource implements LogDataSource {

    private readonly logPath = 'logs/';
    private readonly allLogsPath = 'logs/logs-all.log';
    private readonly mediumLogsPath = 'logs/logs-medium.log';
    private readonly highlLogsPath = 'logs/logs-high.log';

    constructor() {
        this.createLogsFiles();
    }

    private createLogsFiles = () => {
        if(!fs.existsSync(this.logPath)) {
            fs.mkdirSync(this.logPath);
        }
        [
            this.allLogsPath,
            this.mediumLogsPath,
            this.highlLogsPath
        ].forEach(path => {
            if(fs.existsSync(path)) return;
            fs.writeFileSync(path, '');
        });
    }

    async saveLog(newLog: LogEntity): Promise<void> {

        const logAsJson = `${JSON.stringify(newLog)}\n`;

        fs.appendFileSync(this.allLogsPath, logAsJson);

        if(newLog.level === LogSeverityLevel.low) return;

        if(newLog.level ===  LogSeverityLevel.medium) {
            fs.appendFileSync(this.mediumLogsPath, logAsJson);
        } else {
            fs.appendFileSync(this.highlLogsPath, logAsJson); 
        }
    }

    private getLogsFromFile = (path:string): LogEntity[] => {
        const content = fs.readFileSync(path, 'utf-8');
        // const logs = content.split('\n').map(LogEntity.fromJson);
        const logs = content.split('\n').filter(log => log.trim() !== '').map(log => LogEntity.fromJson(log));
        return logs;
    }

    async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
        switch (severityLevel) {
            case LogSeverityLevel.low:
                return this.getLogsFromFile(this.allLogsPath);
        
            case LogSeverityLevel.medium:
                return this.getLogsFromFile(this.mediumLogsPath);   

            case LogSeverityLevel.high:
                return this.getLogsFromFile(this.highlLogsPath); 

            default:
                throw new Error(`${severityLevel} not implemented`);
        }
    }

}

// export class FileSystemDatasource implements LogDatasource {
//     private readonly logPath = 'logs/'
//     private readonly levelPaths = {
//       [LogSeverityLevel.low]: 'logs/logs-low.log',
//       [LogSeverityLevel.medium]: 'logs/logs-medium.log',
//       [LogSeverityLevel.high]: 'logs/logs-high.log'
//     } as const
   
//     async saveLog(newLog: LogEntity): Promise<void> {
//       const levelsWithPaths = Object.entries(this.levelPaths)
   
//       levelsWithPaths.forEach(([level, path]) => {
//         if(
//           level === LogSeverityLevel.low
//           || newLog.level === level
//         ) {
//           fs.appendFileSync(path, JSON.stringify(newLog))
//         }
//       })
//     }
// }
