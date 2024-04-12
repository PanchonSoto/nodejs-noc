import { LogEntity, LogSeverityLevel } from "./log.entity";



describe('LogEntity', ()=> {
    
    const dataObj = {
        message: 'Hola mundo',
        origin: 'log.entity.test.ts',
        level: LogSeverityLevel.high
    }

    test(`should create a LogEntity instance`, ()=>{

        const log = new LogEntity(dataObj);

        expect(log).toBeInstanceOf(LogEntity);
        expect(log.message).toBe(dataObj.message);
        expect(log.level).toBe(dataObj.level);
        expect(log.origin).toBe(dataObj.origin);
        expect(log.createdAt).toBeInstanceOf(Date);

    });

    test(`should create LogEntity instance from json`, ()=>{

        const json = `{"message":"https://googlsdfsdfe.com is not ok. TypeError: fetch failed","level":"high","createdAt":"2024-04-10T18:56:55.010Z","origin":"check-service.ts"}`;

        const log = LogEntity.fromJson(json);

        expect(log).toBeInstanceOf(LogEntity);
        expect(log.level).toBe(LogSeverityLevel.high);
        expect(log.message).toBe('https://googlsdfsdfe.com is not ok. TypeError: fetch failed');
        expect(log.origin).toBe('check-service.ts');
        expect(log.createdAt).toBeInstanceOf(Date);

    });

    test(`should create a LogEntity instance from object`, ()=>{

        const log = LogEntity.fromObject(dataObj);

        expect(log).toBeInstanceOf(LogEntity);
        expect(log.message).toBe(dataObj.message);
        expect(log.level).toBe(dataObj.level);
        expect(log.origin).toBe(dataObj.origin);
        expect(log.createdAt).toBeInstanceOf(Date);

    });

});