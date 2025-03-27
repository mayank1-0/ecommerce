const express = require('express')
const router = express.Router()
const {
  login,
  signup,
  resetPasswordLink,
  resetPassword,
  updateShippingAddress,
  logout,
} = require('../controllers/auth.controller');
const { auth } = require('../middleware/auth');

router.get('/', (req, res) => res.send('Routes are also working'))

router.post('/signup', signup)
router.post('/login', login)
router.post('/send-reset-password-link', resetPasswordLink)
router.put('/reset-password', resetPassword)
router.put('/update-shipping-address', auth, updateShippingAddress)

// clear token i.e. logout
router.get('/logout', auth, logout);

module.exports = router
