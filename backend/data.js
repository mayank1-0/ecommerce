const mongoose = require('mongoose')
const Product = require('./models/Product.model') // adjust the path if necessary
const Customer = require('./models/Customer.model');
require('dotenv').config();

// Array of sample products to insert
const products = [
  {
    productName: 'Nike Air Max 2021',
    slug: 'nike-air-max-2021',
    description:
      'Comfortable and stylish running shoes with excellent cushioning.',
    price: 120.0,
    category: 'Fancy_Product',
    image: '/images/nike-air-max-2021.jpg',
    stock: 30,
    brand: 'Nike',
    rating: 4,
    discount: 10,
  },
  {
    productName: 'PUMA Suede Classic',
    slug: 'puma-suede-classic',
    description: 'Classic suede sneakers for casual wear with a sleek design.',
    price: 75.0,
    category: 'Popular_Item',
    image: '/images/puma-suede-classic.jpg',
    stock: 50,
    brand: 'PUMA',
    rating: 5,
    discount: 5,
  },
  {
    productName: 'Reebok Nano X1',
    slug: 'reebok-nano-x1',
    description: 'Crossfit shoes designed for performance and durability.',
    price: 100.0,
    category: 'Special_Item',
    image: '/images/reebok-nano-x1.jpg',
    stock: 20,
    brand: 'Reebok',
    rating: 4,
    discount: 15,
  },
  {
    productName: 'Reebok Classic Leather',
    slug: 'reebok-classic-leather',
    description: 'Timeless and versatile leather sneakers for everyday use.',
    price: 85.0,
    category: 'Sale_Item',
    image: '/images/reebok-classic-leather.jpg',
    stock: 60,
    brand: 'Reebok',
    rating: 4,
    discount: 20,
  },
  {
    productName: 'Nike React Infinity Run Flyknit',
    slug: 'nike-react-infinity-run-flyknit',
    description:
      'High-performance running shoes with added cushioning for comfort.',
    price: 160.0,
    category: 'Fancy_Product',
    image: '/images/nike-react-infinity-run.jpg',
    stock: 25,
    brand: 'Nike',
    rating: 5,
    discount: 10,
  },
  {
    productName: 'Local Running Shoes',
    slug: 'local-running-shoes',
    description:
      'Affordable running shoes designed for comfort and efficiency.',
    price: 40.0,
    category: 'Sale_Item',
    image: '/images/local-running-shoes.jpg',
    stock: 100,
    brand: 'Local',
    rating: 3,
    discount: 30,
  },
  {
    productName: 'PUMA Future Rider',
    slug: 'puma-future-rider',
    description:
      'A fusion of retro and modern design, with a lightweight and breathable feel.',
    price: 90.0,
    category: 'Popular_Item',
    image: '/images/puma-future-rider.jpg',
    stock: 40,
    brand: 'PUMA',
    rating: 4,
    discount: 5,
  },
  {
    productName: 'Nike ZoomX Vaporfly Next%',
    slug: 'nike-zoomx-vaporfly-next',
    description:
      'Elite running shoes designed for fast-paced marathon runners.',
    price: 250.0,
    category: 'Fancy_Product',
    image: '/images/nike-zoomx-vaporfly.jpg',
    stock: 15,
    brand: 'Nike',
    rating: 5,
    discount: 0,
  },
]

// Function to seed the database
const seedProductsAndDeleteCustomers = async () => {
  try {
    // Connect to the MongoDB database
    await mongoose.connect(process.env.MONGODB_URI);

    // Delete existing products (optional)
    await Product.deleteMany()
    await Customer.deleteMany()

    // Insert the sample products into the database
    await Product.insertMany(products)

    mongoose.disconnect()
  } catch (error) {
    console.error('Error seeding database:', error)
    mongoose.disconnect()
  }
}

seedProductsAndDeleteCustomers()
