const md5 = require('md5');

const User = require('../model/user.model');

const login = async(req,res,next) =>{
    const username = req.cookies.username;
    res.render('login',{
        username
    });
}

const postLogin = async(req,res,next) => {

    const user = await User.find({email : req.body.email});
    if (!user[0]){
        res.render('login',{
            errors : [
                'User does not exist.'
            ]
        });    
        return;
    }



    if (user[0].password !== md5(req.body.password)){
        res.render('login',{
            errors : [
                'Wrong password.'
            ]
        });
        return;
    }
    res.cookie("username",req.body.email,{
        signed : true
    });

    //res.locals.user = user[0];
    res.redirect('/user');
}

const logout = async(req,res) => {
    res.clearCookie("username");
    return res.redirect("/auth/login");
}

module.exports = {
    login,
    postLogin,
    logout
}