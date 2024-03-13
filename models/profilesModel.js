const mongoose = require('mongoose')

const ProfileSchema = new mongoose.Schema({
  name: String,
  description: String,
  mbti: String,
  enneagram: String,
  variant: String,
  tritype: Number,
  socionics: String,
  sloan: String,
  psyche: String,
  image: String
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
})

const ProfileModel = mongoose.model('profiles', ProfileSchema)

// fill in profile data from template code as first profile
ProfileModel.create({
  name: 'A Martinez',
  description: 'Adolph Larrue Martinez III.',
  mbti: 'ISFJ',
  enneagram: '9w3',
  variant: 'sp/so',
  tritype: 725,
  socionics: 'SEE',
  sloan: 'RCOEN',
  psyche: 'FEVL',
  image: 'https://soulverse.boo.world/images/1.png'
})

module.exports = ProfileModel
