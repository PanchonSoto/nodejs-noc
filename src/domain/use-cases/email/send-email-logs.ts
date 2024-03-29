import { EmailService } from "../../../presentation/email/email.service";
import { LogEntity, LogSeverityLevel } from "../../entities/log.entity";
import { LogRepository } from "../../repository/log.repository";



interface SendLogEmailUseCase {
    execute: (to: string | string[]) => Promise<boolean>
}

export class SendEmailLogs implements SendLogEmailUseCase {

    constructor(                                      //no inyectar 'presentation' en 'domain'
        private readonly emailService: EmailService, //FIXME: deberia crearse un repository
        private readonly logRepository: LogRepository
    ){}

    async execute(to: string | string []) {
        try {

            const sent = await this.emailService.sendEmailWithFileSystemLogs(to);
            if(!sent) {
                throw new Error('Email log not sent');
            }

            const log = new LogEntity({ 
                level: LogSeverityLevel.low, 
                origin:'send-email-logs.ts',
                message: `Log email sent`
            });
            this.logRepository.saveLog(log);

            return true;

        } catch (error) {
            
            const log = new LogEntity({ 
                level: LogSeverityLevel.high, 
                origin:'send-email-logs.ts',
                message: `${error}`
            });
            this.logRepository.saveLog(log);

            return false;
        }
    }

}
