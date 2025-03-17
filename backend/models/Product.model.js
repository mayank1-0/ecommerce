const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: [true, 'Please enter product name'],
        maxLength: [40, 'Product name should be less than 40 characters'],
        trim: true
    },

    slug: {
        type: String,
        required: [true, 'Please enter slug'],
        unique: [true, 'Slug should be unique'],
        trim: true
    },

    description: {
        type: String,
        required: [true, "Please enter product description"],
        trim: true
    },

    price: {
        type: Number,
        required: [true, "Please enter product price"]
    },

    category: {
        type: String,
        required: [true, "Please enter product category"],
        enum: ['Fancy_Product', 'Special_Item', 'Sale_Item', 'Popular_Item'],
        default: 'Fancy Product'
    },

    image: {
        type: String,
        required: [true, "Please enter product image"]
    },

    stock: {
        type: Number,
        required: [true, "Please enter product's available stock"]
    },

    brand: {
        type: String,
        enum: ['Nike', 'PUMA', 'Reebok', 'Local'],
        default: 'Local'
    },

    rating: {
        type: Number,
        enum: [1, 2, 3, 4, 5]
    },

    discount: {
        type: Number
    }
},
{
    timestamps: true
});

const Product = mongoose.model('Product', ProductSchema, 'Products')

module.exports = Product;

//Schema = Blueprint (defines the structure of the data)
//Model = Tool (allows you to work with the data in the database e.x. mongoose ODM)