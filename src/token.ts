import jwt from 'jsonwebtoken';
import config from './config';
import { Iuser } from './interfaces/Iuser.js';

export class Token {
     static generate(user: Iuser) {
        const token = jwt.sign({ id: user.id }, config.SECRET.jwt, {
            expiresIn: config.SECRET.jwtExp,
        });

        return token;
    }

     static verify(token: string) {
        return new Promise((resolve, reject) => {
            jwt.verify(token, config.SECRET.jwt, (err : any, payload:any) => {
                if (err) return reject(err);
                resolve(payload);
            });
        });
    }


}
