const express = require('express');
const { register, login, resetPassword, forgotPassword } = require('../Controllers/AuthController');
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/resetPassword/:token', resetPassword);
router.post('/forgotPassword', forgotPassword);


module.exports = router