const mongoose = require('mongoose');
const validator = require('validator');

const customerSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: [true, "Please enter your full name"],
        maxLength: [40, "Full name should be less than 40 characters"],
        trim: true,
    },
    email: {
        type: String,
        required: [true, 'Please enter your email'],
        unique: [true, 'Please enter a new email. Current one is already in use'],
        validate: [validator.isEmail, 'Please enter a valid email'],
        trim: true
    },
    password: {
        type: String,
        required: [true, 'Please enter a password'],
        minLength: [8, "Password should be greater than 8 characters"],
        select: false,
        trim: true
    },
    shippingAddress: {
        type: String,
        maxLength: [200, "Shipping address' length can't be more than 200 characters"],
        trim: true
    },
    role: {
        type: String,
        enum: ['Admin', 'Customer'],
        default: 'Customer'
    },
    resetPasswordToken: String,
    resetPasswordExpiry: Date
},
{
    timestamps: true
});

const Customer = mongoose.model("Customer", customerSchema, 'Customers');

module.exports = Customer;

//Schema = Blueprint (defines the structure of the data)
//Model = Tool (allows you to work with the data in the database e.x. mongoose ODM)