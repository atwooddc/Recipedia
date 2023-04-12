const express = require("express");
const router = express.Router();
const passport = require("passport");
const getBaseUrl = require("../middleware/getBaseUrl");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");

// two required functions for passport-google-oauth20

// @route       GET auth/google
// @desc        Authenticate the user with Google OAuth
// @access      Public
router.get(
    "/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
);

// Max's JWT callback
router.get(
    "/google/callback",
    passport.authenticate("google", { failureRedirect: `${getBaseUrl()}` }),
    (req, res) => {
        let minsToExp = 90;

        let token = jwt.sign(
            {
                exp: Math.floor(Date.now() / 1000) + minsToExp * 60,
                user: req.user,
            },
            process.env.JWT_SECRET
        );

        res.cookie("token", token, { httpOnly: false });
        res.redirect(`${getBaseUrl()}/home`);
    }
);


// @route       GET auth/user
// @desc        Get user data
// @access      Private
router.get('/user', (req, res) => {
    User.findById(req.user._id)
        .then(user => res.send(user))
})

// @route       GET auth/logout
// @desc        Logout user
// @access      Public
router.get("/logout", function (req, res) {
    res.clearCookie("token");
    // req.session = null;
    req.logout();
    res.redirect(`${getBaseUrl()}`);
});

// @route       GET auth/success
// @desc        Placeholder route to show successful logging in w google
// @access      Public
router.get("/success", (req, res) => {
    res.send("test success");
});

// @route       GET auth/failure
// @desc        Placeholder route to show failure logging in w google
// @access      Public
router.get("/failure", (req, res) => {
    res.send("google sign in failure");
});

// won't work without jwt

// @route       GET private test
// @desc        Test private
// @access      Private
router.get("/privatetest", auth, (req, res) => {
    res.send("private test success");
});

module.exports = router;
