import * as dotenv from 'dotenv'
dotenv.config()

import express, * as e from 'express'
import bodyParser from 'body-parser';

const port = process.env.PORT
const app = express()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/greeting', (req, res) => {
    res.send({greeting: 'Hello World!'})
});

app.listen(port, () => {
    console.log(`⚡️ Chipsnote backend is listening on port ${port}`);
});