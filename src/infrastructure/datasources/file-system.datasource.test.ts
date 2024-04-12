import fs from 'fs';
import path from 'path';
import { FileSystemDataSource } from './file-system.datasource';
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';



describe('FileSystemDataSource ',() => {

    const logPath = path.join(__dirname,'../../../logs');

    beforeEach(()=>{
        // fs.rmSync(logPath, {recursive: true, force: true});            
        // fs.access(logPath, fs.constants.F_OK | fs.constants.W_OK, (err) => {
        //     if (err) {
        //       return;
        //     }
        //     fs.rmSync(logPath, {recursive: true, force: true});
        //   });
    });

    test(`should create log files if they don't exist`,()=>{

        new FileSystemDataSource();
        const files = fs.readdirSync(logPath);

        expect(files).toEqual([ 'logs-all.log', 'logs-high.log', 'logs-medium.log' ]);


    });

    test(`should save a log in logs-all.log`, ()=>{

        const logDatasource = new FileSystemDataSource();
        const log = new LogEntity({
            message: 'test',
            level: LogSeverityLevel.low,
            origin: 'file-system.datasource.test'
        });

        logDatasource.saveLog(log);

        const allLogs = fs.readFileSync(`${logPath}/logs-all.log`,'utf-8');
        
        expect(allLogs).toContain(JSON.stringify(log));
    });

    test(`should save a log in logs-all.log and medium`, async()=>{

        const logDatasource = new FileSystemDataSource();
        const log = new LogEntity({
            message: 'test',
            level: LogSeverityLevel.medium,
            origin: 'file-system.datasource.test'
        });

        await logDatasource.saveLog(log);

        const allLogs = fs.readFileSync(`${logPath}/logs-all.log`,'utf-8');
        const allMediumLog = fs.readFileSync(`${logPath}/logs-medium.log`,'utf-8');
        
        expect(allLogs).toContain(JSON.stringify(log));
        expect(allMediumLog).toContain(JSON.stringify(log));
    });

    test(`should save a log in logs-all.log and high`, async()=>{

        const logDatasource = new FileSystemDataSource();
        const log = new LogEntity({
            message: 'test',
            level: LogSeverityLevel.high,
            origin: 'file-system.datasource.test'
        });

        await logDatasource.saveLog(log);

        const allLogs = fs.readFileSync(`${logPath}/logs-all.log`,'utf-8');
        const allHighLog = fs.readFileSync(`${logPath}/logs-high.log`,'utf-8');
        
        expect(allLogs).toContain(JSON.stringify(log));
        expect(allHighLog).toContain(JSON.stringify(log));
    });

    test(`should return all logs`, async()=>{
        fs.rmSync(logPath, {recursive: true, force: true}); 
        const logDatasource = new FileSystemDataSource();
        const logLow = new LogEntity({
            level: LogSeverityLevel.low,
            message: 'log-low',
            origin: 'low'
        });
        const logMedium = new LogEntity({
            level: LogSeverityLevel.medium,
            message: 'log-medium',
            origin: 'Medium'
        });
        const logHigh = new LogEntity({
            level: LogSeverityLevel.high,
            message: 'log-High',
            origin: 'High'
        });

        await logDatasource.saveLog(logLow);
        await logDatasource.saveLog(logMedium);
        await logDatasource.saveLog(logHigh);

        const logsLow = await logDatasource.getLogs(LogSeverityLevel.low);
        const logsMedium = await logDatasource.getLogs(LogSeverityLevel.medium);
        const logsHigh = await logDatasource.getLogs(LogSeverityLevel.high);

        expect(logsLow).toEqual(expect.arrayContaining([logLow, logMedium, logHigh]));
        expect(logsMedium).toContain(expect.arrayContaining([logMedium]));
        expect(logsHigh).toEqual(expect.arrayContaining([logHigh]));


        
    });
});