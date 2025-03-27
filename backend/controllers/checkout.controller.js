const Customer = require('../models/Customer.model')
const Order = require('../models/Order.model')
const axios = require('axios')
require('dotenv').config();

const { PAYPAL_CLIENT_ID, PAYPAL_APP_SECRET } = process.env;
const base = 'https://api-m.sandbox.paypal.com';

const generateAccessToken = async () => {
  const auth = Buffer.from(PAYPAL_CLIENT_ID + ':' + PAYPAL_APP_SECRET).toString(
    'base64'
  );
  const response = await fetch(`${base}/v1/oauth2/token`, {
    method: 'post',
    body: 'grant_type=client_credentials',
    headers: {
      Authorization: `Basic ${auth}`,
    },
  });

  const jsonData = await handleResponse(response);
  return jsonData.access_token;
};

const handleResponse = async (response) => {
  if (response.status === 200 || response.status === 201) {
    return response.json();
  }

  const errorMessage = await response.text();
  throw new Error(errorMessage);
};

const createOrder = async (req, res) => {
  const { cart, total } = req.body

  // Verify customer has shipping address
  const customer = await Customer.findById(req.id)
  if (!customer.shippingAddress) {
    return res.status(400).json({
      success: false,
      message: 'Shipping address is required',
    })
  }

  const accessToken = await generateAccessToken();
  const url = `${base}/v2/checkout/orders`;
  const response = await axios(url, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      intent: 'CAPTURE',
      purchase_units: [
        {
          amount: {
            currency_code: 'USD',
            value: total,
            breakdown: {
              item_total: {
                currency_code: 'USD',
                value: total,
              },
            },
          },
          shipping: {
            address: {
              address_line_1: customer.shippingAddress,
              // Add other address components if available
            },
          },
          items: cart.map((item) => ({
            name: item.name,
            unit_amount: {
              currency_code: 'USD',
              value: item.productPrice,
            },
            quantity: item.quantity,
          })),
        },
      ],
    }),
  });

  return handleResponse(response);
};

const capturePaypalOrder = async (req, res) => {
  const { orderId } = req.params
  const accessToken = await generateAccessToken();
  const url = `${base}/v2/checkout/orders/${orderId}/capture`;
  const response = await axios(url, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });
  if (response.status === 200 || response.status === 201) {
    // Here you would:
    // 1. Create an order in your database
    // 2. Clear the user's cart
    // 3. Send confirmation email, etc.
  }


  return handleResponse(response);
};

const getCustomersOrders = async (req, res) => {
  try {
    const orders = await Order.find({ customer: req.id })
      .sort('-createdAt')
      .lean()

    res.status(200).json({
      success: true,
      count: orders.length,
      orders,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

const getSingleOrder = async (req, res) => {
  try {
    const order = await Order.findOne({
      _id: req.params.orderId,
      customer: req.id,
    })

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found',
      })
    }

    res.status(200).json({
      success: true,
      order,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

module.exports = {
  createOrder,
  capturePaypalOrder,
  getCustomersOrders,
  getSingleOrder,
}
