const express = require('express')
const route = express.Router()

route.get('/', (req, res) => {
    res.render('index')
})

route.get('/contact', (req, res) => {
    res.render('contact')
})

module.exports = route