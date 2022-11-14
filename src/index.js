import dotenv from 'dotenv'
dotenv.config()
import cors from 'cors'
import express from 'express'
import routes from './routes/index.js'
import moment from "moment";
import bodyParser from "body-parser";
import helmet from "helmet";
import rateLimit from 'express-rate-limit'

import './config/mongo.js'

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, 
	max: 100, 
	standardHeaders: true,
	legacyHeaders: false, 
})

const app = express();
app.use(cors())
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(helmet());
app.use(limiter)

app.use('/api', routes)
global.moment = moment;


app.listen(8080, () => {
    console.log(`Server is Started on 8080 !`)
})