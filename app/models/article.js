const { Schema, model } = require('mongoose')

const Article = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  user: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  is_published: { type: Boolean, select: false, default: false },
  reason: { type: String, select: false, default: '(:' },
})

module.exports = model('Article', Article)
