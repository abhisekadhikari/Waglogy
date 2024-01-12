import mongoose from "mongoose"
import { DB_NAME } from "../constants.js"

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(
            process.env.DATABASE_URI,
            {
                dbName: DB_NAME,
            }
        )
        console.log(
            `MongoDB connected !! DB Name : ${connectionInstance.connection.name}`
        )
    } catch (error) {
        console.log("MongoDb connection error:", error)
        process.exit(1)
    }
}

export default connectDB
