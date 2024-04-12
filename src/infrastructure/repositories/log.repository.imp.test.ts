import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';
import { LogRepositoryImp } from "./log.repository.imp";



describe('LogRepoImp ', ()=>{

    const mockLogDataSource = {
        saveLog: jest.fn(),
        getLogs: jest.fn()
    }

    const logRepository = new LogRepositoryImp(mockLogDataSource);

    beforeEach(()=>{
        jest.clearAllMocks();
    });

    test('saveLog should call the darasource with args', async()=>{
        const log = { level: LogSeverityLevel.high, message: 'hola' } as LogEntity;
        await logRepository.saveLog(log);
        expect(mockLogDataSource.saveLog).toHaveBeenCalledWith(log);
    });

    test('getLogs should call the darasource with args', async()=>{
        await logRepository.getLogs(LogSeverityLevel.low);
        expect(mockLogDataSource.getLogs).toHaveBeenCalledWith(LogSeverityLevel.low);
    });

});