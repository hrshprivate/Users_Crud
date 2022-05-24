const jwt = require('jsonwebtoken')

const token = require('../verify')

function AuthOnly(req, res, next) {
  try {
    const data = token.act_token(req, res)
    req.newuser = data // newuser - created new user
    next()
  } catch (e) {
    console.log(e)
    return res.status(403).json({ message: 'User not authorized' })
  }
}

module.exports.AuthOnly = AuthOnly
