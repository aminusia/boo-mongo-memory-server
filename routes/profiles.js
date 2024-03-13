'use strict'

const ProfileModel = require('../models/profilesModel')
const { profileExists, profileValidation } = require('./middlewares/profileMiddleware')
const express = require('express')
const router = express.Router()

module.exports = function () {
  // getting specific profile
  router.get('/:id',
    profileExists(),
    async function (req, res, next) {
      const profiles = await ProfileModel.find({}).limit(1)
      res.render('profile_template', {
        profile: profiles[0]
      })
    })

  // creating new profile
  router.post('/',
    profileValidation(),
    async function (req, res, next) {
      const {
        name,
        description = '',
        mbti,
        enneagram,
        variant,
        tritype,
        socionics,
        sloan,
        psyche,
        image = 'https://soulverse.boo.world/images/1.png'
      } = req.body

      const profile = await ProfileModel.create({
        name,
        description,
        mbti,
        enneagram,
        variant,
        tritype,
        socionics,
        sloan,
        psyche,
        image
      })
      res.send({ success: true, profile })
    })

  // updating existing profile
  router.post('/:id',
    profileValidation(),
    profileExists(),
    async function (req, res, next) {
      const {
        name,
        description = '',
        mbti,
        enneagram,
        variant,
        tritype,
        socionics,
        sloan,
        psyche,
        image = 'https://soulverse.boo.world/images/1.png'
      } = req.body

      const _id = req.params.id
      const profile = await ProfileModel.findOneAndUpdate({ _id }, {
        name,
        description,
        mbti,
        enneagram,
        variant,
        tritype,
        socionics,
        sloan,
        psyche,
        image
      }, { new: true })

      res.send({ success: true, profile })
    })

  return router
}
