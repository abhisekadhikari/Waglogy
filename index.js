const express = require('express');
const bodyParser = require('body-parser');
const {engine} = require('express-handlebars');
const app = express();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(require('./Routes/route'))
app.engine('handlebars', engine());
app.set('view engine', 'handlebars')
app.set('views', './views')
app.use('/static', express.static('static'))
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});