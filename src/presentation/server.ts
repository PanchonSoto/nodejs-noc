import { CronService } from "./cron/cron-service";
import { CheckService } from '../domain/use-cases/checks/check-service';
import { LogRepositoryImp } from "../infrastructure/repositories/log.repository.imp";
import { FileSystemDataSource } from '../infrastructure/datasources/file-system.datasource';
import { EmailService } from "./email/email.service";
import { SendEmailLogs } from "../domain/use-cases/email/send-email-logs";

const fileSysLogRepository = new LogRepositoryImp(
    new FileSystemDataSource()
);

const emailService = new EmailService();

export class Server {

    public static start() {
        console.log('Server started...');
        //TODO: mandar email
        // new SendEmailLogs(
        //     emailService,
        //     fileSysLogRepository
        // ).execute(['pureschaos98@gmail.com','panshibe@gmail.com']);

        // emailService.sendEmailWithFileSystemLogs(
        //     ['pureschaos98@gmail.com','panshibe@gmail.com']
        // );

        // CronService.createJob(
        //     '*/5 * * * * *',
        //     ()=>{
        //         const url = 'https://google.com';
        //         new CheckService(
        //             fileSysLogRepository,
        //             ()=>console.log(`${url} is ok.`),
        //             (error)=>console.log(error)
        //         ).execute(url);
        //         // new CheckService().execute('http://localhost:3000/');
        //     }
        // );
    }

}