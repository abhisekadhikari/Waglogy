const express = require('express')
const route = express.Router()

route.get('/', (req, res) => {
    res.render('index')
})

route.get('/contact', (req, res) => {
    res.render('contact')
})


route.get('/services', (req, res) => {
    res.render('services')
})
route.get('/studentc', (req, res) => {
    res.render('studentc')
})

route.get('/about',(req, res)=> {
res.render('about')

})
module.exports = route