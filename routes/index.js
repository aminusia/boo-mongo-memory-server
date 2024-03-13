'use strict'

const ProfileModel = require('../models/profilesModel')
const express = require('express')
const router = express.Router()

module.exports = function () {
  router.get('/*', async function (req, res, next) {
    const profiles = await ProfileModel.find({}).limit(1)
    res.render('profile_template', {
      profile: profiles[0]
    })
  })

  return router
}
