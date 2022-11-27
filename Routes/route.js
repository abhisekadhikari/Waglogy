const express = require('express')
const route = express.Router()

route.get("/", (req, res) => {
    res.status(200).json({
        status: "ok",
        message: "Welcome to Waglogy.",
    })
})

route.post("/post", (req, res) => {
    data = req.body.name
    role = req.body.role
    console.log(data , role)
    res.status(200).json({status: "ok"})
})

module.exports = route