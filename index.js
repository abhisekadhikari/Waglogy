const express = require('express');
const path = require('path')
const bodyParser = require('body-parser');
const { engine } = require('express-handlebars');
const mongoose = require('mongoose')
const app = express();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static("public"))
app.engine('.hbs', engine({ extname: '.hbs' }));
app.set('view engine', '.hbs')
app.set('views', './views')
app.use(require('./Routes/route'))
DB_link = "mongodb://localhost:27017/Users"
mongoose.connect("mongodb://127.0.0.1:27017/Waglogy").then(() => {
    console.log("Connection Successful")
}).catch((err) => {
    if (err) {
        console.log("Connection Unsuccessful")
    }
})
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});