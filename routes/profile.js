'use strict'

const ProfileModel = require('../models/profiles')
const express = require('express')
const router = express.Router()

ProfileModel.create({
  "id": 1,
  "name": "A Martinez",
  "description": "Adolph Larrue Martinez III.",
  "mbti": "ISFJ",
  "enneagram": "9w3",
  "variant": "sp/so",
  "tritype": 725,
  "socionics": "SEE",
  "sloan": "RCOEN",
  "psyche": "FEVL",
  "image": "https://soulverse.boo.world/images/1.png",
})

module.exports = function() {

  router.get('/*', async function(req, res, next) {
    const profiles = await ProfileModel.find({}).limit(1)
    res.render('profile_template', {
      profile: profiles[0],
    })
  })

  return router
}

