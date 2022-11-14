
import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()
const {  MONGO_PORT, MONGO_HOST, MONGO_COLLECTION } = process.env
const options = {
    // useUnifiedTopology: true,
    // useNewUrlParser : true,
    // useCreateIndex: true,
    // useFindAndModify : false
}
console.log(  `mongodb://${MONGO_HOST}:${MONGO_PORT}/${MONGO_COLLECTION}`)

// Create mongo database connection
mongoose.connect(
  `mongodb://${MONGO_HOST}:${MONGO_PORT}/${MONGO_COLLECTION}`,
  options,
)


const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})
