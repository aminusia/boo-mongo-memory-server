'use strict'

const UserModel = require('../models/usersModel')
const { userExists, userValidation } = require('./middlewares/userMiddleware')
const express = require('express')
const router = express.Router()

module.exports = function () {
  // getting user data
  router.get('/:id',
    userExists(),
    async function (req, res, next) {
      const id = req.params.id
      const user = await UserModel.findOne({ _id: id })
      res.send({ success: true, user })
    })

  // creating new user
  router.post('/',
    userValidation(),
    async function (req, res, next) {
      const { name } = req.body
      const user = await UserModel.create({ name })
      res.send({ success: true, user })
    })

  // updating existing user
  router.post('/:id',
    userValidation(),
    userExists(),
    async function (req, res, next) {
      const { name } = req.body
      const _id = req.params.id
      const user = await UserModel.findOneAndUpdate({ _id }, { name }, { new: true })
      res.send({ success: true, user })
    })

  return router
}
