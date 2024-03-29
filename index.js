const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyparser = require('body-parser');
const passport = require('passport')
const dotenv = require('dotenv');
const port = process.env.PORT || 4000;
dotenv.config();
const app = express();

require('./DataBase/Connect')
require('./Passport/Bearer')

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(bodyParser.json({ limit: "52428800" }));
app.use(bodyParser.urlencoded({ limit: "52428800", extended: true, parameterLimit: 50000 }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(session({ resave: true, secret: process.env.JWT_SECRET, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());


app.get('/', async (req, res) => {
    res.json({ message: 'Welcome to my REST API.' });
});
app.use('/api', require('./Routes/AuthApi'))
app.use('/api', require('./Routes/ProductAPi'))
app.use('/api', require('./Routes/CategoryAPI'))
app.use('/api', require('./Routes/OrderApi'))
app.unsubscribe('/api', require('./Routes/UserApi'))

app.listen(port, console.log('App running on port ' + port)
)