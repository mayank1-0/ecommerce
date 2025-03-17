const express = require('express');
const router = express.Router();
const { fetchAllProducts, fetchProductsByCategory, fetchSelectedAndRelatedProducts, fetchProducts, fetchDesiredProductsOrSingleProduct } = require('../controllers/product.controller');

router.get('/fetch-all-products', fetchAllProducts);
router.get('/fetch-products-by-category/:category', fetchProductsByCategory);
router.get('/fetch-selected-product-and-related-products/:product_id', fetchSelectedAndRelatedProducts);

// combined route of fetch all products and fetch products by category
router.get('/fetch-products/:all_or_category?', fetchProducts);

// Seperate route for Context API in frontend. Single route for combined above 3 apis
// router.get('/fetch-products/:desired/:product_id?', fetchDesiredProductsOrSingleProduct);

module.exports = router;