const express = require('express')
const auth = require('./routes/auth')
const product = require('./routes/product')
const checkout = require('./routes/checkout');
const cors = require('cors')
const cookieParser = require('cookie-parser')
const session = require('express-session');
const app = express()

app.use(
	session({
		resave: true,
		saveUninitialized: true,
		secret: "XCR3rsasa%RDHHH",
		cookie: {},
	})
);

app.use(
  cors({
    origin: 'https://ecommerce-five-phi-40.vercel.app', // Allow requests from this origin
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
	credentials: true
  })
)
app.use(express.json()) // req.body req.json idhar udhar krne ke liye
app.use(express.static('public')) // This will make all files inside the public folder accessible via URLs starting with /
app.use(cookieParser())
app.use('/auth', auth)
app.use('/product', product)
app.use('/checkout', checkout)

app.get('/', (req, res) => {
  res.send('App is running')
})

module.exports = app
