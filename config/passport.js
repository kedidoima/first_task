const FacebookStrategy = require('passport-facebook').Strategy;
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

const configAuth = require('./auth');
const User = require('../model/user.model');

module.exports = function(passport){
    passport.serializeUser(function(user,done){
        done(null,user);
    });
    passport.deserializeUser(function(id,done){
        done(null,id);
    });

    passport.use(new FacebookStrategy({
        clientID : configAuth.facebook.clientID,
        clientSecret : configAuth.facebook.clientSecret,
        callbackURL : configAuth.facebook.callbackURL
    },
    function (accessToken, refreshToken, profile, done){
        process.nextTick(function(){
            User.findOne({'facebook.id' : profile.id}, function(err,user){
                if (user)
                    return done(null,user);
                else {
                    let newUser = new User();
                    newUser.facebook.id = profile.id;
                    newUser.facebook.token = accessToken;
                    newUser.facebook.name = profile.name.givenName + ' ' + profile.name.familyName;
                    newUser.facebook.email = profile.emails[0].value;
                    newUser.save(function(err){
                        if (err) throw err;
                        return done(null,newUser);
                    })
                    console.log(profile);
                }
            });
        })
    }))

    passport.use(new GoogleStrategy({
        clientID : configAuth.google.clientID,
        clientSecret : configAuth.google.clientSecret,
        callbackURL : configAuth.google.callbackURL
    },
    function(token, tokenSecret, profile, done) {
        User.findOne({ 'google.id': profile.id }, function (err, user) {
            if (user){
                console.log(user);
                return done(null,user);
            } else {
                let newUser = new User();
                newUser.name = profile.displayName;
                newUser.email = profile.emails[0].value;
                newUser.id = profile.id;
                newUser.google.id = profile.id;
                newUser.google.token = token;
                newUser.google.name = profile.displayName;
                newUser.google.email = profile.emails[0].value;
                
                newUser.save(function(err){
                    if (err) throw err;
                    return done(null,newUser);
                })
                
                }
          });
      }
    ));
}
