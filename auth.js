const Router = require('express')
const { check } = require('express-validator')

const View = require('./view')
const Permission = require('./permissions/authperm')

const router = new Router()

router.post(
  '/registration',
  [
    check('username', 'Username can not be empty').notEmpty(),
    check('password', 'Password must be more then 8 symbols').isLength({
      min: 8,
      max: 99,
    }),
  ],
  View.registration
)
router.post('/login', View.login)
router.get('/users', View.getUsers)
router.get('/users/:id', View.getOneUser)
router.put('/users', Permission.AuthOnly, View.updateUser)
router.delete('/users/:id', Permission.AuthOnly, View.deleteUser)

module.exports = router
