const express = require('express');
const bodyParser = require('body-parser');
const {signout, signup, signin, isSignedIn} = require('../controllers/auth');
const {check } = require('express-validator');
const router = express.Router();

router.use(bodyParser.json());

//routes
router.post('/signup', [
    check('name', 'name should be at least 3 char').isLength({min: 3}),
    check('email', 'email is required').isEmail(),
    check('password', 'password should be at least 3 char').isLength({min: 3})
] , signup);

router.post('/signin', [
    check('email', 'email is required').isEmail(),
    check('password', 'password field is required').isLength({min: 3})
] , signin);


router.get('/signout', signout);



module.exports = router;