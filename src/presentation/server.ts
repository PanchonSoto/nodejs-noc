import { CronService } from "./cron/cron-service";
import { CheckService } from '../domain/use-cases/checks/check-service';
import { LogRepositoryImp } from "../infrastructure/repositories/log.repository.imp";
import { FileSystemDataSource } from '../infrastructure/datasources/file-system.datasource';
import { EmailService } from "./email/email.service";

const fileSysLogRepository = new LogRepositoryImp(
    new FileSystemDataSource()
);

export class Server {

    public static start() {
        console.log('Server started...');
        //TODO: mandar email
        // const emailService = new EmailService();

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