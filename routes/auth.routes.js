const express       = require('express')
const router        = express.Router()
const passport      = require('passport')
// const jwt           = require('jsonwebtoken')
// const auth          = require('../middleware/auth')


// two required functions for passport-google-oauth20

// @route       GET auth/google
// @desc        Authenticate the user with Google OAuth
// @access      Public
router.get('/google', passport.authenticate('google', { scope: ['profile'] }));
// router.get("/google",
//     passport.authenticate("google", { scope: ["profile", "email"] })
// );


// @route       GET auth/google/callback
// @desc        Redirects to success message
// @access      Public
router.get('/google/callback',
    passport.authenticate('google', { failureRedirect: '/', failureMessage: true }),
    function(req, res) {
        res.redirect('/success');
}); 

// @route       GET auth/success
// @desc        Placeholder route to show successful logging in w google
// @access      Public
router.get('/success', (req, res) => {
    res.send('test success');
})


// router.get("/google/callback",
//     passport.authenticate("google", { failureRedirect: '/'}), (req, res) => {
//         let minsToExp = 90;
      
//         let token = jwt.sign({
//             exp: Math.floor(Date.now() / 1000) + (minsToExp * 60),
//             user: req.user
//         }, process.env.JWT_SECRET)

//         res.cookie("token", token, {httpOnly:false})
//         res.redirect('/')
//   }
// );

module.exports = router;