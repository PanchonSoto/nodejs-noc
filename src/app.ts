
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

    
    Server.start();
    // console.log(envs);
}