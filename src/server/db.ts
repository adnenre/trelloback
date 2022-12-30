import mongoose, { ConnectOptions } from 'mongoose';
import config from '../config';

const db = {
    successCallback: function () {
        console.log('✅ Connected succefully to database!');
    },
    catchError: function (error : Error) {
        console.log('connextion to database failed !', error);
    },
};

// how to connect to mongoose db with typescript ? 
export const dbConnect = async (url = config.dbUrl) => {
    mongoose.set('strictQuery', true);
    return await mongoose
        .connect(url, { useNewUrlParser: true, useUnifiedTopology: true } as ConnectOptions)
        .then(db.successCallback)
        .catch(db.catchError);
};
