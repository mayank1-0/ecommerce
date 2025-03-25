const Product = require('../models/Product.model');

const fetchAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        if( !products ) return res.status(404).send({success: false, message:`No products found in the database`})
        res.status(200).send({success: true, message:`Products fetched successfully`, products});
    } catch (error) {
        res.status(500).send({success: false, error: error.message, message: `Unable to fetch products. Something went wrong`});
    }
}

const fetchProductsByCategory = async (req, res) => {
    try {
        const category = req.params.category;
        if(!category) return res.status(401).send({success: false, message: "Please select a category"});
        const products = await Product.find({category});
        if(!products) return res.status(404).send({success: false, message: 'No products of the selected category exists in the database', products: null});
        res.status(200).send({success: true, message:`Products of the selected category fetched successfully`, products});
    } catch (error) {
        res.status(500).send({success: false, error: error.message, message: `Unable to fetch products of the selected category. Something went wrong`});        
    }
}

const fetchSelectedAndRelatedProducts = async (req, res) => {
    try {
        const product_id = req.params.product_id;
        if(!product_id) return res.status(400).send({success: false, message: 'Please select a product first'})
        const selectedProduct = await Product.findById(product_id);
        if(!selectedProduct) return res.status(404).send({success: false, message: `No product with the selected id exists in the database`});
        const relatedProducts = await Product.find({
            $or: [
                { category: selectedProduct.category }, // Same category
                { brand: selectedProduct.brand } // Same brand
            ],
            _id: { $ne: product_id} //Exclude the current product
        }).limit(4);
        if(!relatedProducts) return res.status(207).send({success: true, message: `No related products to the selected product exists in the database`, selectedProduct});
        res.status(200).send({success: true, message: `Selected product and related products found successfully`, selectedProduct, relatedProducts});
    } catch (error) {
        res.status(500).send({success: false, error: error.name, message: `An error occured while fetching products. Something went wrong`})
    }
}

// combination of fetchAllProducts and fetchProductsByCategory controller-functions
const fetchProducts = async (req, res) => {
    try {
        const which = req.params.all_or_category;
        let categoryName;
        switch (which) {
            case 'popular-items':
                categoryName = 'Popular_Item';
                break;
            case 'fancy-products':
                categoryName = 'Fancy_Product';
                break;
            case 'special-items':
                categoryName = 'Special_Item';
                break;
            case 'sale-items':
                categoryName = 'Sale_Item';
                break;
        }
        if( categoryName ){
            const products = await Product.find({category: categoryName});
            if(!products) return res.status(404).send({success: false, message: 'No products of the selected category exists in the database', products: null});
            return res.status(200).send({success: true, message:`Products of the selected category fetched successfully`, products});
        }
        const products = await Product.find();
        if( !products ) return res.status(404).send({success: false, message:`No products found in the database`})
        res.status(200).send({success: true, message:`All products fetched successfully`, products});
    } catch (error) {
        res.status(500).send({success: false, error: error.message, message: `Unable to fetch the desired products. Something went wrong`});        
    }
}

// For Context API
const fetchDesiredProductsOrSingleProduct = async (req, res) => {
    try {
        let desired = req.params.desired;
        if( !desired || desired === 'all'){
            const products = await Product.find();
            if( !products ) return res.status(404).send({success: false, message:`No products found in the database`})
            return res.status(200).send({success: true, message:`Products fetched successfully`, products});
        }

    } catch (error) {
        
    }
}

module.exports = { fetchAllProducts, fetchProductsByCategory, fetchSelectedAndRelatedProducts, fetchProducts, fetchDesiredProductsOrSingleProduct }