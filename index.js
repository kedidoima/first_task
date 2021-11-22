const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');

const authMiddleware = require("./middleware/auth.middleware");

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser('test'));

mongoose.connect('mongodb://localhost:27017/first-task');

const pageRoute = require('./route/page_route');
const eventRoute = require('./route/event.route');
const titleContentRoute = require('./route/titleContent.route');
const locationRoute = require('./route/location.route');
const userRoute = require('./route/user.route');
const authRoute = require('./route/auth.route')

app.set('view engine', 'pug');
app.set('views','./views');
app.use(express.static('public'));

app.use('',pageRoute);
app.use('/event',authMiddleware.requireAuth,eventRoute);
app.use('/tCs',authMiddleware.requireAuth,titleContentRoute);
app.use('/locs',authMiddleware.requireAuth,locationRoute);
app.use('/user',authMiddleware.requireAuth,userRoute);
app.use('/auth',authRoute);

app.get('/setcookie', (req, res) => {
    res.cookie(`Cookie token name`,`encrypted cookie string Value`);
    res.send('Cookie have been saved successfully');
});

app.listen(port); 
