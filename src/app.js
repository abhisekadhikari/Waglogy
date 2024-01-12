import express, { urlencoded } from "express"
import route from "./routes/route.js"
import cors from "cors"
import path from "path"
import ApiError from "./utils/ApiError.js"
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

app.use((err, req, res, next) => {
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({ message: err.message })
  }
  return res.status(500).json({
    message: "Internal Server Error.",
  })
})

export { app }
