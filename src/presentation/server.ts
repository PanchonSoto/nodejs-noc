import { CronService } from "./cron/cron-service";
import { CheckService } from '../domain/use-cases/checks/check-service';
import { LogRepositoryImp } from "../infrastructure/repositories/log.repository.imp";
import { FileSystemDataSource } from '../infrastructure/datasources/file-system.datasource';
import { EmailService } from "./email/email.service";
import { SendEmailLogs } from "../domain/use-cases/email/send-email-logs";
import { MongoLogDatasource } from "../infrastructure/datasources/mongo-log.datasource";
import { LogSeverityLevel } from "../domain/entities/log.entity";
import { PostgresLogDatasource } from "../infrastructure/datasources/postgres-log.datasource";
import { CheckServiceMultiple } from "../domain/use-cases/checks/check-service-multiple";

// const fileSysLogRepository = new LogRepositoryImp(
//     new FileSystemDataSource()
// );

const fsLogRepository = new LogRepositoryImp(
    new FileSystemDataSource()
    // new MongoLogDatasource(),
    // new PostgresLogDatasource
);

const mongoLogRepository = new LogRepositoryImp(
    // new FileSystemDataSource()
    new MongoLogDatasource(),
    // new PostgresLogDatasource
);

const postgresLogRepository = new LogRepositoryImp(
    // new FileSystemDataSource()
    // new MongoLogDatasource(),
    new PostgresLogDatasource
);

const emailService = new EmailService();

export class Server {

    public static async start() {
        console.log('Server started...');
        //TODO: mandar email
        // new SendEmailLogs(
        //     emailService,
        //     fileSysLogRepository
        // ).execute(['pureschaos98@gmail.com','panshibe@gmail.com']);

        // emailService.sendEmailWithFileSystemLogs(
        //     ['pureschaos98@gmail.com','panshibe@gmail.com']
        // );
        // const logs = await logRepository.getLogs(LogSeverityLevel.high);
        // console.log(logs);
        
        // CronService.createJob(
        //     '*/5 * * * * *',
        //     ()=>{
        //         const url = 'https://googlsdfsdfe.com';
        //         new CheckServiceMultiple(
        //             [mongoLogRepository, postgresLogRepository, fsLogRepository],
        //             ()=>console.log(`${url} is ok.`),
        //             (error)=>console.log(error)
        //         ).execute(url);
        //         // new CheckService().execute('http://localhost:3000/');
        //     }
        // );
    }

}