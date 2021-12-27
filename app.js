const express = require('express');
const app = express();
const session = require('express-session');
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const routes = require('./route');
const config = require('./config')
 
app.set('view engine', 'ejs');
 
app.use(session({
  resave: false,
  saveUninitialized: true,
  secret: 'SECRET'
}));
 
app.use(passport.initialize());
app.use(passport.session());
 
passport.serializeUser(function (user, cb) {
  cb(null, user);
});
 
passport.deserializeUser(function (obj, cb) {
  cb(null, obj);
});
 
passport.use(new FacebookStrategy({
    clientID: config.facebookAuth.clientID,
    clientSecret: config.facebookAuth.clientSecret,
    callbackURL: config.facebookAuth.callbackURL,
    profileFields: config.facebookAuth.profileFields
  }, function (accessToken, refreshToken, profile, done) {
    console.log(profile)
    return done(null, profile);
  }
));
 
app.use('/', routes);
 
const port = 3000;
 
app.listen(port, () => {
  console.log('App listening on port ' + port);
});