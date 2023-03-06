const express           = require('express');
const router            = express.Router();
// const auth              = require('../middleware/auth')

// @route       GET public test
// @desc        Test public
// @access      Public
router.get('/', (req, res) => {
    res.send('test success');
})

// won't work without jwt

// @route       GET private test
// @desc        Test private
// @access      Private
// router.get('/test/private', auth, (req, res) => {
//     res.send('private test success');
// })

module.exports = router;