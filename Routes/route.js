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



route.get('/services', (req, res) => {
    res.render('services')
})

route.get('/studentc', (req, res) => {
    res.render('studentc')
})

route.get('/about',(req, res)=> {
res.render('about')

})
route.get('/privicy',(req, res)=> {
    res.render('privicy')
})
route.post('/api/contact', (req, res) => {
    const {name, number, email, message} = req.body
    if (!name || !number|| !email || !message) {
        return res.status(500).json({
            Error: "Fill all The Fields"
        })
    } else {
        const data = new Contact({name, email, number, message})
        data.save()
        // res.redirect('/contact')
        res.status(200).json({
            message: "Send Successfully"
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
    contact = await Contact.find({}).lean()
    if(!data || !contact)
    {
        return res.status(404).json({
            message: "There Is No Feedbacks"
        })
    }
    res.render('feedback', {
        data, contact
    })
})


module.exports = route