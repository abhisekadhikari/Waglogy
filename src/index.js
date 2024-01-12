import dotenv from 'dotenv'
import connectDB from './db/dbConfig.js'
import { app } from './app.js'
dotenv.config({
    path: './.env',
})

connectDB()
    .then(() => {
        app.on('error', (err) => {
            throw err
        })
        app.listen(process.env.PORT || 3000, () => {
            console.log(`Server is running at port: ${process.env.PORT}`)
        })
    })
    .catch((err) => {
        console.log('MongoDb connection error:', err)
    })
