
import { envs } from "./config/plugins/envs.plugins";
import { LogModel, MongoDatabase } from "./data/mongoDB";
import { Server } from "./presentation/server";



(async()=>{
    main();
})();



async function main() {
    await MongoDatabase.connect({
        mongoUrl: envs.MONGO_URL,
        dbName: envs.MONGO_DB_NAME,
    });
    //crear una coleccion
    // const newLog = await LogModel.create({
    //     message: 'Test message from Mongo',
    //     origin: 'App.ts',
    //     level: 'low'
    // });

    // await newLog.save();
    const log = await LogModel.find();
    console.log(log);
    // console.log(newLog);
    Server.start();
    // console.log(envs);
}