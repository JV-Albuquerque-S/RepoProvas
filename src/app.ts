import { countReset } from 'console';
import express, { json } from 'express';
import 'express-async-errors';
import cors from 'cors';

//import handleErrors from './middlewares/***';
import router from './routes/index'

const app = express();
app.use(json());
app.use(cors());
app.use(router);
//app.use(handleErrors);

export default app;