import { CronService } from "./cron-service";

const mockTick = jest.fn();

describe('CronService ',() => {

    test('should create a job',(done)=>{
        const job = CronService.createJob('* * * * * *', mockTick);

        setTimeout(() => {
            expect(mockTick).toHaveBeenCalledTimes(2);
            job.stop();
            done();
        }, 2000);
    });

});