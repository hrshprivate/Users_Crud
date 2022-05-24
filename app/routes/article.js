const Router = require('express')
const { check } = require('express-validator')

const ArtView = require('../controllers/article_view')
const ArtPermission = require('../permissions/authperm')

const art_router = new Router()

art_router.post(
  '/article',
  [
    check('title', 'Username can not be empty').notEmpty(),
    check('user', 'Password must be more then 8 symbols').notEmpty(),
  ],
  ArtView.createArticle
)

art_router.get('/article', ArtPermission.AuthOnly, ArtView.getArticles)
art_router.get('/article/:id', ArtPermission.AuthOnly, ArtView.getOneArticle)
art_router.put('/article', ArtPermission.AuthOnly, ArtView.updateArticle)
art_router.delete('/article/:id', ArtPermission.AuthOnly, ArtView.deleteArticle)

module.exports = art_router
