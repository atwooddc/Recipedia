const express = require("express");
const router = express.Router();
const getBaseUrl = require("../middleware/getBaseUrl");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
const User = require('../models/user.model')
const bcrypt = require("bcrypt");

// @route       GET auth/user
// @desc        Get user data
// @access      Private
router.get("/user", auth, (req, res) => {
    User.findById(req.user).then((user) => res.send(user));
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res
                .status(401)
                .json({ message: "Invalid email or password" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res
                .status(401)
                .json({ message: "Invalid email or password" });
        }

        const payload = {
            _id: user._id,
        }

        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });

        // res.cookie("token", token, { httpOnly: false });
        res.status(200).json({
            success: true,
            message: "Logged in successfully!",
            user: user,
            token: token,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});

// @route       GET auth/logout
// @desc        Logout user
// @access      Public
router.get("/logout", function (req, res) {
    res.clearCookie("token");
    req.session = null;
    res.redirect(`${getBaseUrl()}`);
});

module.exports = router;
