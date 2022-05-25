const { validationResult } = require('express-validator')

const User = require('../models/user')
const Article = require('../models/article')
const token = require('../verify')

class ArticleView {
  async createArticle(req, res) {
    try {
      const error = validationResult(req)
      if (!error.isEmpty()) {
        return res.status(400).json({ message: 'Creating errors', error })
      }
      const { title, content, user } = req.body
      const fut_user = await User.findOne({ _id: user })
      console.log(fut_user)
      if (fut_user) {
        const article = new Article({
          title: title,
          content: content,
          user: fut_user,
        })
        await article.save()
        return res.json({ message: 'Article was created!' })
      } else {
        return res.status(400).json({ message: 'Have not this user', error })
      }
    } catch (e) {
      console.log(e)
      res.status(400).json({ message: 'Article error' })
    }
  }

  async getArticles(req, res) {
    try {
      const Options = {
        page: req.query.page,
        limit: req.query.limit,
      }
      const data = token.act_token(req, res)
      const user_ok = await User.findById(data.id)
      if (user_ok.role === 'ADMIN') {
        const all_art = await Article.find()
          .select('+is_published +reason')
          .populate('user')
        return res.status(200).json(all_art)
      }
      Article.find({
        $or: [{ is_published: true }, { user: data.id }],
      })
        .populate('user')
        .select('+reason')
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
      return res.status(400).json({ message: 'Article error' })
    }
  }

  async getOneArticle(req, res) {
    try {
      const id = req.params.id
      const article = await Article.findById(id).populate('user')
      if (article) {
        return res.json(article)
      }
    } catch (e) {
      console.log(e)
      res.status(400).json({ message: 'For one article error' })
    }
  }

  async updateArticle(req, res) {
    try {
      const id = req.body._id
      const data = req.body
      const inf = token.act_token(req, res)
      const user = await User.findById(inf.id)
      if (user.role === 'ADMIN') {
        const upd_article = await Article.findByIdAndUpdate(id, data)
          .select('+is_published')
          .populate('user')
        return res.json(upd_article)
      }
      const is_pub = await Article.findById(id).select('+is_published')
      console.log(is_pub.is_published)
      if (is_pub.is_published) {
        const upd_article = await Article.findByIdAndUpdate(id, data).populate(
          'user'
        )
        if (upd_article) {
          return res.json(upd_article)
        }
      } else {
        res.status(400).json({ message: 'Update error' })
      }
    } catch (e) {
      console.log(e)
      res.status(400).json({ message: 'Update error' })
    }
  }

  async deleteArticle(req, res) {
    try {
      const id = req.params.id
      const article = await Article.findByIdAndDelete(id)
      if (article) {
        res.json({ article })
      }
    } catch (e) {
      console.log(e)
      res.status(400).json({ message: 'Update error' })
    }
  }
}

module.exports = new ArticleView()
