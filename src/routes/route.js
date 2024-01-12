import { Router } from "express"
import router from "./user.routes.js"
import path from "path"

const route = Router()

route.route("/").get((req, res) => {
    const __dirname = path.resolve()
    res.sendFile(path.join(__dirname, "../", "public/index.html"))
})

route.use(router)

export default route
