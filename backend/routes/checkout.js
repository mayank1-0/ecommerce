const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const { client } = require('../utils/paypal');
const { createOrder, capturePaypalOrder, getCustomersOrders, getSingleOrder } = require('../controllers/checkout.controller');

router.post('/create-paypal-order', auth, createOrder );
router.post('/capture-paypal-order/:orderID', auth, capturePaypalOrder);
router.get('/orders', auth, getCustomersOrders)
router.get('/orders/:orderId', auth, getSingleOrder)

module.exports = router;