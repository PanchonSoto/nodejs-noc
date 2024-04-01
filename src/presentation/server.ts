import { CronService } from "./cron/cron-service";
import { CheckService } from '../domain/use-cases/checks/check-service';
import { LogRepositoryImp } from "../infrastructure/repositories/log.repository.imp";
import { FileSystemDataSource } from '../infrastructure/datasources/file-system.datasource';
import { EmailService } from "./email/email.service";
import { SendEmailLogs } from "../domain/use-cases/email/send-email-logs";
import { MongoLogDatasource } from "../infrastructure/datasources/mongo-log.datasource";
import { LogSeverityLevel } from "../domain/entities/log.entity";

// const fileSysLogRepository = new LogRepositoryImp(
//     new FileSystemDataSource()
// );

const logRepository = new LogRepositoryImp(
    // new FileSystemDataSource()
    new MongoLogDatasource()
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
        const logs = await logRepository.getLogs(LogSeverityLevel.high);
        console.log(logs);
        
        // CronService.createJob(
        //     '*/5 * * * * *',
        //     ()=>{
        //         const url = 'https://google.com';
        //         new CheckService(
        //             logRepository,
        //             ()=>console.log(`${url} is ok.`),
        //             (error)=>console.log(error)
        //         ).execute(url);
        //         // new CheckService().execute('http://localhost:3000/');
        //     }
        // );
    }

}