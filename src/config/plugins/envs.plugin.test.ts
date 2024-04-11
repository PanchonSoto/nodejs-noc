import { envs } from "./envs.plugins";



describe('env.plugin.ts', ()=> {

    test('should return env options', ()=> {
        expect(envs).toEqual({
            PORT: 3000,
            MAILER_SERVICE: 'gmail',
            MAILER_EMAIL: 'pureschaos98@gmail.com',
            MAILER_SECRET_KEY: 'kiyvzprjsjmxmwfp',
            PROD: false,
            MONGO_URL: 'mongodb://panshibe:123456789@localhost:27017',
            MONGO_DB_NAME: 'NOC-TEST',
            MONGO_USER: 'panshibe',
            MONGO_PASS: '123456789'
        });
    });

});