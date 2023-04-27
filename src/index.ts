import * as dotenv from 'dotenv'
dotenv.config()

import express, * as e from 'express'
import bodyParser from 'body-parser';
import router from './routes/sinks';

const port = process.env.PORT
const app = express()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
    req.user_id = '1'
    return next()
})

app.get('/greeting', (req, res) => {
    res.send({greeting: 'Hello World!'})
});

app.use("/me/sinks", router)

app.listen(port, () => {
    console.log(`⚡️ Chipsnote backend is listening on port ${port}`);
});