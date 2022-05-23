const jwt = require('jsonwebtoken')

function AuthOnly(req, res, next) {
  try {
    const token = req.headers.authorization.split(' ')[1]
    if (!token) {
      return res.status(403).json({ message: 'User not authorized' })
    }
    const data = jwt.verify(token, process.env.SECRET)
    req.newuser = data // newuser - created new user
    next()
  } catch (e) {
    console.log(e)
    return res.status(403).json({ message: 'User not authorized' })
  }
}

module.exports.AuthOnly = AuthOnly
