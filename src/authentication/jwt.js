const jwt = require('jsonwebtoken')

const sign = payload => jwt.sign(payload, process.env.JWT_TOKEN, { expiresIn: 86400 })

const decode = token => {
  if (!token) {
    return null
  }
  return jwt.verify(token, process.env.JWT_TOKEN)
}

module.exports = {
  sign,
  decode
}
