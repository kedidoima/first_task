const User = require('../model/user.model');

module.exports.requireAuth = function(req,res,next){
    if (!req.signedCookies.username){
        res.redirect('/auth/login');
        return;
    }
    const user = User.find({email : req.signedCookies.username});
    if (!user) {
        res.redirect('/auth/login');
        return;
    }
    res.locals.auth = true;
    next();
}