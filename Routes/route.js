const express = require('express')
const route = express.Router()

route.get('/', (req, res) => {
    res.render('index')
})

route.get('/contact', (req, res) => {
    res.render('contact')
})

route.get('/about', (req, res) => {
    res.render('about')
})

route.get("*", (req, res) => {
    res.render('nopage')
})

module.exports = route