const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true }
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
})

UserSchema.index({ name: 1 })

module.exports = mongoose.model('users', UserSchema)
