const app = require('./app')
const DBConnection = require('./database/DBConnection')
require('dotenv').config()

DBConnection()

app.listen(process.env.PORT)
