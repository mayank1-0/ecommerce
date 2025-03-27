const jwt = require('jsonwebtoken')
require('dotenv').config()

const auth = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1]
    if (req.session.user && req.session.token && req.session.token === token) {
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
      const tokenStatus = decodedToken.isActive
      if (tokenStatus) {
        req.id = decodedToken.id;
        next()
      } else {
        throw 'Invalid Token'
      }
    } else if (!req.session.token) {
      console.log(`Access via REST API client for e.x. POSTMAN`)
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
      if (decodedToken.isActive) {
        req.id = decodedToken.id;
        next()
      } else {
        throw 'Token expired'
      }
    } else {
      throw 'Invalid token'
    }
  } catch (error) {
    res.status(401).send({ error: 'Authorization failed. Invalid token' })
  }
}

module.exports = { auth }
