const express = require('express');
const dotenv = require('dotenv');

const session = require("express-session");
const passport = require("passport");
const cookieParser = require("cookie-parser")
const getBaseUrl = require('./middleware/getBaseUrl')

const session = require("express-session");
const passport = require("passport");
const cookieParser = require("cookie-parser")
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

passport.serializeUser((user, done) => {
    done(null, user.id)
 })

 passport.deserializeUser((id, done) => {
    done(null, id);
 })


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

passport.serializeUser((user, done) => {
    done(null, user.id)
 })

 passport.deserializeUser((id, done) => {
    done(null, id);
 })


//use built in body parser
app.use(express.json());
<<<<<<< Updated upstream
=======
app.use(cookieParser())

// auth stuff
const authRoutes = require('./routes/auth.routes')
const testRoutes = require('./routes/test.routes');
app.use('/auth', authRoutes)
app.use('/test', testRoutes);

>>>>>>> Stashed changes
app.use(cookieParser())

// auth stuff
const authRoutes = require('./routes/auth.routes')
const testRoutes = require('./routes/test.routes');
app.use('/auth', authRoutes)
app.use('/test', testRoutes);

// Set port and listen
const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Server listening on port ${port}`));
