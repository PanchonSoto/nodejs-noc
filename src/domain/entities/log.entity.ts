export enum LogSeverityLevel {
    low = 'low',
    medium = 'medium',
    high = 'high'
}

export interface LogEntityOptions {
    level: LogSeverityLevel;
    message: string;
    origin: string;  
    createdAt?: Date;
}

export class LogEntity {
    
    public level: LogSeverityLevel;
    public message: string;
    public createdAt: Date;
    public origin: string;

    constructor(options: LogEntityOptions) {
        this.message = options.message;
        this.level = options.level;
        this.createdAt = new Date();
        this.origin = options.origin;
    }


    static fromJson = (json:string):LogEntity => {
        const { message, level, createdAt=new Date(), origin } = JSON.parse(json);

        const log = new LogEntity({
            message: message, 
            level: level,
            createdAt: createdAt,
            origin: origin
        });
        
        return log;

    }


    static fromObject = (object: {[keys:string]:any}):LogEntity => {
        
        const {message,level,createdAt,origin} = object;
        const log = new LogEntity({
            message ,level, createdAt,origin  
        });
        return log;
    }


}

