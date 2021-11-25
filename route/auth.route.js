const express = require('express');

const router = express.Router();
const passport = require('passport');
const authController = require('../controller/authController');
require('../config/passport')(passport);

router.get('/login',authController.login);
router.post('/login',authController.postLogin);
router.get('/logout',authController.logout);
router.get('/signup',authController.getCreateUser);
router.post('/signup',authController.postCreateUser);
router.get('/facebook',passport.authenticate('facebook',{scope:'email'}))

router.get('/facebook/callback',passport.authenticate('facebook',{
    successRedirect : '/profile',
    failureRedirect : '/failed'
}))
router.get('/google',passport.authenticate('google',{scope:['profile', 'email']}))
router.get('/google/callback',
    passport.authenticate('google',{failureRedirect: '/error'}),
    function(req,res){
        res.cookie("username",req.user.email,{
            signed : true
        });
        res.redirect('/user');
        
    }
)

module.exports = router;