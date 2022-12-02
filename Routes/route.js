const express = require('express')
const route = express.Router()
const Contact = require('../Model/Schema')
const Feedback = require('../Model/Feedback')

route.get('/', (req, res) => {
    res.render('index')
})

route.get('/contact', (req, res) => {
    res.render('contact')
})

<<<<<<< HEAD

route.get('/services', (req, res) => {
    res.render('services')
})
=======
route.post('/api/contact', (req, res) => {
    const {name, number, email} = req.body
    if (!name || !number|| !email) {
        res.status(500).json({
            Error: "Fill all The Filds"
        })
    } else {
        console.log(req.body)
        const data = new Contact({name, email, number})
        data.save()
        res.status(200).json({
            message: "Successful"
        })
    }
})

route.post('/api/feedback', (req, res) => {
    const {name, message} = req.body
    if (!name || !message) {
        return res.status(501).json({message: "Error"})
    }
    const data = new Feedback({name, message})
    data.save()
    res.status(200).json({
        message: "Successful"
    })
})

route.get('/admin', async (req, res) => {
    data = await Feedback.find({})
    if(!data)
    {
        return res.status(404).json({
            message: "There Is No Feedbacks"
        })
    }
    res.render('feedback', {data})
})

>>>>>>> master
module.exports = route