const express = require('express');
const app = express();
const port = 3000;

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const authMiddleware = require("./middleware/auth.middleware");


const pageRoute = require('./route/page_route');
const eventRoute = require('./route/event.route');
const titleContentRoute = require('./route/titleContent.route');
const locationRoute = require('./route/location.route');
const userRoute = require('./route/user.route');
const authRoute = require('./route/auth.route');

mongoose.connect('mongodb://localhost:27017/first-task');


app.set('view engine', 'pug');
app.set('views','./views');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser('test'));
app.use(session({
    secret:"thisissecretkey",
    resave: true,
    saveUninitialized: true,
}))
app.use(passport.initialize());
app.use(passport.session());

app.use('',pageRoute);
app.use('/event',authMiddleware.requireAuth,eventRoute);
app.use('/tCs',authMiddleware.requireAuth,titleContentRoute);
app.use('/locs',authMiddleware.requireAuth,locationRoute);
app.use('/user',authMiddleware.requireAuth,userRoute);
app.use('/auth',authRoute);

app.get('/profile',(req,res) =>{
    console.log(req.user);
    res.send("you are valid user")
})
app.get('/failed',(req,res)=>{
    res.send("You are a non valid user")
})
app.listen(port); 
