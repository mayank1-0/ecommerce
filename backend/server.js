const app = require('./app')
const DBConnection = require('./database/DBConnection')
require('dotenv').config()

DBConnection()

app.listen(process.env.PORT,
    ()=>console.log(`Your app is live at http://localhost:${process.env.PORT}`)
)
