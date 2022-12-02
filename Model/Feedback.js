const express = require('express')
const mongoose = require('mongoose')

const message = mongoose.Schema({
    name:
    {
        type: String,
        required: true
    },
    message:
    {
        type: String,
        required: true
    }
})

const Feedback = new mongoose.model('Feedback', message)

module.exports = Feedback