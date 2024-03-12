const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose)

const ProfileSchema = new mongoose.Schema({
  id: { type: Number, unique: true, min: 1 },
  name: String,
  description: String,
  mbti: String,
  enneagram: String,
  variant: String,
  tritype: Number,
  socionics: String,
  sloan: String,
  psyche: String,
  image: String,
}, { 
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
})

ProfileSchema.plugin(AutoIncrement, {inc_field: 'id'})

module.exports = mongoose.model('profiles', ProfileSchema)