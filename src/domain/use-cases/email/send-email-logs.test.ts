import { EmailService } from "../../../presentation/email/email.service";
import { LogEntity } from "../../entities/log.entity";
import { LogRepository } from "../../repository/log.repository";
import { SendEmailLogs } from "./send-email-logs";



describe('SendEmailLogs ', () => {

    const mockEmailService = {
        sendEmailWithFileSystemLogs: jest.fn().mockReturnValue(true)
    }
    const mockLogRepo: LogRepository = {
        saveLog: jest.fn(),
        getLogs: jest.fn()
    }

    const sendEmailLogs = new SendEmailLogs(
        mockEmailService as any,
        mockLogRepo
    );

    beforeEach(()=>{
        jest.clearAllMocks();
    });

    test('should call sendEmail and saveLog', async()=>{

        const result = await sendEmailLogs.execute('panchon.ues@gmail.com');
        expect(result).toBe(true);
        expect(mockEmailService.sendEmailWithFileSystemLogs).toHaveBeenCalledTimes(1);
        expect(mockLogRepo.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
        expect(mockLogRepo.saveLog).toHaveBeenCalledWith({
            "createdAt": expect.any(Date),
            "level": "low",
            "message": "Log email sent",
            "origin": "send-email-logs.ts",
        });
    });

    test('should log in case of error', async()=>{
        mockEmailService.sendEmailWithFileSystemLogs.mockResolvedValue(false);

        const sendEmailLogs = new SendEmailLogs(
            mockEmailService as any,
            mockLogRepo
        );
        const result = await sendEmailLogs.execute('panchon.ues@gmail.com');
        expect(result).toBe(false);
        expect(mockEmailService.sendEmailWithFileSystemLogs).toHaveBeenCalledTimes(1);
        expect(mockLogRepo.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
        expect(mockLogRepo.saveLog).toHaveBeenCalledWith({
            "createdAt": expect.any(Date),
            "level": "high",
            "message": "Error: Email log not sent",
            "origin": "send-email-logs.ts",
        });
    });

});