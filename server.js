const express = require('express');
const dotenv = require('dotenv');

const session = require("express-session");
const passport = require("passport");
const getBaseUrl = require('./middleware/getBaseUrl')

const app = express();

dotenv.config();

app.use(session({
    secret: process.env.EXPRESS_SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());


var GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: `${getBaseUrl(false)}/auth/google/callback`
  },
  function(accessToken, refreshToken, profile, cb) {
    return cb(null, profile);
    // User.findOrCreate({ googleId: profile.id }, function (err, user) {
    //    return cb(err, user);
    // });
  }
));

// https://medium.com/@prashantramnyc/how-to-implement-google-authentication-in-node-js-using-passport-js-9873f244b55e

passport.serializeUser( (user, done) => {
    done(null, user)
 })

 passport.deserializeUser((user, done) => {
   done (null, user)
 })


// use built in express body parser
app.use(express.json());

// auth stuff
const authRoutes = require('./routes/auth.routes')
const testRoutes = require('./routes/test.routes');
app.use('/auth', authRoutes)
app.use('/test', testRoutes);

// Set port and listen
const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Server listening on port ${port}`));
