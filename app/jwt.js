const jwt = require('jsonwebtoken')
require('dotenv').config()

const jwt_token = (id) => {
  const payload = {
    id,
  }
  return jwt.sign(payload, process.env.SECRET, { expiresIn: '48h' })
}
/*

*/
module.exports.jwt_token = jwt_token
