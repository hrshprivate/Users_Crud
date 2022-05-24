const Router = require('express')
const { check } = require('express-validator')

const View = require('../controllers/view')
const ArtView = require('../controllers/article_view')
const Permission = require('../permissions/authperm')

const art_router = new Router()

art_router.post(
  '/article',
  [
    check('title', 'Username can not be empty').notEmpty(),
    check('user', 'Password must be more then 8 symbols').notEmpty(),
  ],
  ArtView.createArticle
)

art_router.get('/article', ArtView.getArticles)
art_router.get('/article/:id', ArtView.getOneArticle)
art_router.put('/article', ArtView.updateArticle)
art_router.delete('/article/:id', ArtView.deleteArticle)

module.exports = art_router
