import express, { urlencoded } from "express"
import route from "./routes/route.js"
import cors from "cors"
import path from "path"
import globalErrorMiddleware from "./middlewares/globalErrorMiddleware.js"
const app = express()
const __dirname = path.resolve()
app.use(
    cors({
        origin: process.env.CORS_ORIGIN,
        credentials: true,
    })
)
app.use(express.json())
app.use(
    urlencoded({
        extended: true,
    })
)

app.use(express.static(path.join(__dirname, "/src", "/public")))

app.use(route)

app.use(globalErrorMiddleware)

export { app }
