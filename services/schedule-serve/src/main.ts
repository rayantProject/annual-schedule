import express from 'express';
import { connect } from './db/db';
import router from './router/router';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

connect()
    .then(() => {
        app.use(router);
        app.listen(3000, () => {
            console.log('Server is running on http://localhost:3000');
        });
    })
    .catch((error) => {
        console.error(error);
    });
