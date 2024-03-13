'use strict'

const CommentModel = require('../models/commentsModel')
const { userExists } = require('./middlewares/userMiddleware')
const { profileExists } = require('./middlewares/profileMiddleware')
const { commentExists, commentValidation } = require('./middlewares/commentMiddleware')
const express = require('express')
const router = express.Router()

const {
  MBTI_OPTIONS,
  ENNEAGRAM_OPTIONS,
  ZODIAC_OPTIONS
} = require('../constants/personality')

module.exports = function () {
  // getting comment list
  router.get('/',
    async function (req, res, next) {
      const { mbti = '', enneagram = '', zodiac = '', sort = 'best', limit = 20 } = req.query

      // update sorting query from 'sort' switch
      let sortBy = { like_count: -1 }
      if (sort === 'recent') sortBy = { created_at: -1 }

      // update filter query
      let filter = {}
      if (mbti && MBTI_OPTIONS.includes(mbti)) {
        filter = { mbti }
      } else if (enneagram && ENNEAGRAM_OPTIONS.includes(enneagram)) {
        filter = { enneagram }
      } else if (zodiac && ZODIAC_OPTIONS.includes(zodiac)) {
        filter = { zodiac }
      }

      // fetch comments from DB
      const comments = await CommentModel.aggregate([
        {
          $match: filter
        }, {
          $addFields: {
            like_count: { $size: '$likes' }
          }
        }, {
          $sort: sortBy
        }, {
          $limit: limit
        }
      ])

      res.send({ success: true, comments })
    })

  // getting comment details
  router.get('/:id',
    commentExists(),
    async function (req, res, next) {
      const id = req.params.id
      const comment = await CommentModel.findOne({ _id: id })
      res.send({ success: true, comment })
    })

  // creating new comment
  router.post('/',
    commentValidation(),
    userExists({ idField: 'user' }),
    profileExists({ idField: 'profile' }),
    async function (req, res, next) {
      const {
        user,
        profile,
        title,
        content,
        mbti,
        enneagram,
        zodiac
      } = req.body

      const comment = await CommentModel.create({
        user,
        profile,
        title,
        content,
        mbti,
        enneagram,
        zodiac
      })

      res.send({ success: true, comment })
    })

  // updating existing comment
  router.post('/:id',
    commentValidation(),
    commentExists(),
    async function (req, res, next) {
      const {
        title,
        content,
        mbti,
        enneagram,
        zodiac
      } = req.body

      const _id = req.params.id
      const comment = await CommentModel.findOneAndUpdate({ _id }, {
        title,
        content,
        mbti,
        enneagram,
        zodiac
      }, { new: true })

      res.send({ success: true, comment })
    })

  // like a comment
  router.post('/:id/like',
    commentExists(),
    userExists({ idField: 'user' }),
    async function (req, res, next) {
      const { user } = req.body
      const _id = req.params.id

      // check if user already likes the comment, then toggle the like
      let comment = await CommentModel.findOne({ _id, likes: user })
      if (comment) {
        comment = await CommentModel.findOneAndUpdate({ _id }, { $pull: { likes: user } }, { new: true })
      } else {
        comment = await CommentModel.findOneAndUpdate({ _id }, { $addToSet: { likes: user } }, { new: true })
      }

      res.send({ success: true, comment })
    })

  return router
}
