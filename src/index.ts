import * as dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import bodyParser from 'body-parser';
import compression from 'compression'

import { errorHandlingMiddleware, jwtCheck, extractUserData } from './middleware';
import { sinksRouter, notesRouter } from './routes';

if (process.env.PORT === undefined) {
    throw new Error("PORT is not set in env")
}

const port = process.env.PORT
const app = express();

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

app.listen(port, () => {
    console.log(`⚡️ Chipsnote backend is listening on port ${port}`);
});