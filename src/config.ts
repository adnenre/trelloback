import 'dotenv/config';
import { Iconfig } from './interfaces/Iconfig';


const dbUrl : string = process.env.MONGODB_URL || 'mongodb://localhost:27017'
const config: Iconfig = {
    PORT: 5000,
    SECRET: {
        crypto: process.env.CRYPTOSECRET || 'cryptoKey',
        jwt: process.env.SECRET_TOKEN || 'cryptoKey',
        jwtExp: '1h',
    },
    dbUrl
}; 

export default config;
