const express = require('express');
const path = require('path')
const bodyParser = require('body-parser');
const { engine } = require('express-handlebars');
const app = express();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.engine('.hbs', engine({ extname: '.hbs' }));
app.set('view engine', '.hbs')
app.set('views', './views')
app.use(require('./Routes/route'))
app.use(express.static("public"))
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});