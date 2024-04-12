import { LogEntity } from "../../entities/log.entity";
import { CheckServiceMultiple } from "./check-service-multiple";



describe('Check-service useCase', () => {

    const mockRepo1 = {
        saveLog: jest.fn(),
        getLogs: jest.fn()
    }
    const mockRepo2 = {
        saveLog: jest.fn(),
        getLogs: jest.fn()
    }
    const mockRepo3 = {
        saveLog: jest.fn(),
        getLogs: jest.fn()
    }
    const sucessCallback = jest.fn();
    const errorCallback = jest.fn();
    
    const checkServiceM = new CheckServiceMultiple(
        [mockRepo1, mockRepo2, mockRepo3],
        sucessCallback,
        errorCallback
    );

    beforeEach(()=>{
        jest.clearAllMocks();
    });


    test('should call sucessCallback when fetch returns true', async()=>{
        

        const wasOk = await checkServiceM.execute('https://www.google.com');

        expect(wasOk).toBe(true);
        expect(sucessCallback).toHaveBeenCalled();
        expect(errorCallback).not.toHaveBeenCalled();

        expect(mockRepo1.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
        expect(mockRepo2.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
        expect(mockRepo3.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));

    });


    test('should call errorCallback when fetch returns false', async()=>{
        

        const wasOk = await checkServiceM.execute('https://www.googlesdfsd.com');

        expect(wasOk).toBe(false);
        expect(sucessCallback).not.toHaveBeenCalled();
        expect(errorCallback).toHaveBeenCalled();

        expect(mockRepo1.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
        expect(mockRepo2.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
        expect(mockRepo3.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));

    });

});