const express = require('express');
const auth = require('./routes/auth');
const product = require('./routes/product');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());    // req.body req.json idhar udhar krne ke liye
app.use(express.static('public'));  // This will make all files inside the public folder accessible via URLs starting with /
app.use('/auth', auth);
app.use('/product', product);

app.get('/', (req,res)=> {
    res.send('App is running');
})

module.exports = app;