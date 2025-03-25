const mongoose = require('mongoose')
require('dotenv').config()

const DBConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log(`Successfully connected to the MongoDB database`)
  } catch (error) {
    console.log(`Unable to connect to the database. Internet not connected`);
  }
}

module.exports = DBConnection
