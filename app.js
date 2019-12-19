'use strict';

const express = require('express');
const app = express();
const PORT = 3000;
const home = require('./routes/home');
const fleet = require('./routes/fleet');
const admin = require('./routes/admin');
const session = require('express-session');

app.use(session({
    secret: 'abcdefg',
    resave: false,
    saveUninitialized: true,
}));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(express.static(__dirname + '/public'));
app.use('/', home);
app.use('/fleet', fleet);
app.use('/admin', admin);

app.listen(PORT, () => {console.log(`App listening on PORT: ${PORT}`)});
