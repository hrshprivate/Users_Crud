const jwt = require('jsonwebtoken')

const act_token = (req, res) => {
  token = req.headers.authorization.split(' ')[1]
  if (!token) {
    return res.status(403).json({ message: 'Not auth' })
  }
  const data = jwt.verify(token, process.env.SECRET)
  return data
}

module.exports.act_token = act_token
