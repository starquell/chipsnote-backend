import * as dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import bodyParser from 'body-parser';
import compression from 'compression'
import morgan  from 'morgan'
import cors from  'cors'

import { errorHandlingMiddleware, jwtCheck, extractUserData } from './middleware';
import { sinksRouter, notesRouter } from './routes';

if (process.env.PORT === undefined) {
    throw new Error("PORT is not set in env")
}

const port = process.env.PORT
const host = process.env.HOST || "localhost"
const app = express();

app.use(morgan('combined'))
app.use(cors())
app.use(jwtCheck);
app.use(extractUserData)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(compression())

app.get('/greeting', (req, res) => {    
    res.send({greeting: `Hello, ${req.user_id}!`})
});
app.use("/me/sinks", sinksRouter)
app.use("/me/notes", notesRouter)

app.use(errorHandlingMiddleware);

app.listen(parseInt(port), host, () => {
    console.log(`⚡️ Chipsnote backend is listening on port ${port}`);
});