import * as dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import bodyParser from 'body-parser';
import compression from 'compression'

import { errorHandlingMiddleware, dummyAuthMiddleware } from './middleware';
import { sinksRouter } from './routes';

const port = process.env.PORT
const app = express()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(compression())

app.use(dummyAuthMiddleware)

app.get('/greeting', (req, res) => {    
    res.send({greeting: `Hello, ${req.user_id}!`})
});
app.use("/me/sinks", sinksRouter)

app.use(errorHandlingMiddleware);

app.listen(port, () => {
    console.log(`⚡️ Chipsnote backend is listening on port ${port}`);
});