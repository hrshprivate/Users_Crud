const bcrypt = require('bcryptjs')
const { validationResult } = require('express-validator')

const User = require('./models/user')
const jwt_token = require('./jwt')

class View {
  async registration(req, res) {
    try {
      const error = validationResult(req)
      if (!error.isEmpty()) {
        return res.status(400).json({ message: 'Registrations errors', error })
      }
      const { username, password } = req.body
      const pos_user = await User.findOne({ username: username })
      if (pos_user) {
        console.log(username)
        return res.status(400).json({ message: 'Invalid username' })
      }
      const hash_p = bcrypt.hashSync(password, 6)
      const user = new User({
        username: username,
        password: hash_p,
      })
      await user.save()
      return res.json({ message: 'User was created!' })
    } catch (e) {
      console.log(e)
      res.status(400).json({ message: 'Reg error' })
    }
  }

  async login(req, res) {
    try {
      const { username, password } = req.body
      const user = await User.findOne({ username: username })
      if (!user) {
        return res.status(400).json({ message: `User ${username} not found` })
      }
      const compare_pas = bcrypt.compareSync(password, user.password)
      if (!compare_pas) {
        return res.status(400).json({ message: 'Wrong password entered' })
      }
      const token = jwt_token.jwt_token(user._id)
      return res.json({ token })
    } catch (e) {
      console.log(e)
      res.status(400).json({ message: 'Auth error' })
    }
  }

  async getUsers(req, res) {
    try {
      const Options = {
        page: req.query.page,
        limit: req.query.limit,
      }

      User.find()
        .skip(Options.page * Options.limit)
        .limit(Options.limit)
        .exec((err, inf) => {
          if (err) {
            res.status(400).json(err)
          }
          res.status(200).json(inf)
        })
    } catch (e) {
      console.log(e)
      res.status(400).json({ message: 'Users error' })
    }
  }

  async getOneUser(req, res) {
    try {
      const id = req.params.id
      const user = await User.findById(id)
      if (user) {
        res.json(user)
      }
    } catch (e) {
      console.log(e)
      res.status(400).json({ message: 'For one user error' })
    }
  }

  async updateUser(req, res) {
    try {
      const id = req.body._id
      const data = req.body
      const upd_user = await User.findByIdAndUpdate(id, data)
      if (upd_user) {
        res.json(upd_user)
      }
    } catch (e) {
      console.log(e)
      res.status(400).json({ message: 'Update error' })
    }
  }

  async deleteUser(req, res) {
    try {
      const id = req.params.id
      const user = await User.findByIdAndDelete(id)
      if (user) {
        res.json({ user })
      }
    } catch (e) {
      console.log(e)
      res.status(400).json({ message: 'Update error' })
    }
  }
}

module.exports = new View()
