const { Schema, model } = require('mongoose')

const Article = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  user: [{ type: String, ref: 'User' }],
  is_published: { type: Boolean, default: false },
})

module.exports = model('Article', Article)
