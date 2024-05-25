import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const dbName = process.env.MONGO_DB || '';
const dbUrl = process.env.MONGO_URI || '';

export const connect = () => {
    console.log('Connecting to database');
    console.log(dbUrl);
    return mongoose.connect(dbUrl, {
        dbName,
    });
};
