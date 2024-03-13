const mongoose = require('mongoose')

const CommentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
  profile: { type: mongoose.Schema.Types.ObjectId, ref: 'profiles' },
  title: String,
  content: String,
  mbti: String,
  enneagram: String,
  zodiac: String,
  likes: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'users' }
  ]
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
})

CommentSchema.index({ created_at: 1, mbti: 1, enneagram: 1, zodiac: 1 })

CommentSchema.virtual('like_count').get(function () {
  return this.likes.length
})

module.exports = mongoose.model('comments', CommentSchema)
