const express = require('express');
const router = express.Router();
const { login, signup, resetPasswordLink, resetPassword } = require('../controllers/auth.controller');

router.get('/', (req,res) => res.send('Routes are also working'));

router.post('/signup', signup);
router.post('/login', login);
router.post('/send-reset-password-link', resetPasswordLink);
router.put('/reset-password', resetPassword);

module.exports = router;