const CommentsModel = require('../../models/commentsModel')
const errorResponse = require('../helpers/errorResponse')
const {
  MBTI_OPTIONS,
  ENNEAGRAM_OPTIONS,
  ZODIAC_OPTIONS
} = require('../../constants/personality')

function commentExists (options = {}) {
  return async function (req, res, next) {
    let _id = req.params.id

    // optional for id in the body params
    const { idField } = options
    if (idField) _id = req.body[idField]

    // check if comment exists
    const comment = await CommentsModel.findOne({ _id })
    if (!comment) {
      errorResponse({
        httpCode: 404,
        message: 'Please use existing comment id'
      }, req, res, next)
    }

    next()
  }
}

function commentValidation () {
  return function (req, res, next) {
    const { user, profile, title, content, mbti = '', enneagram = '', zodiac = '' } = req.body

    // user field is mandatory
    if (!user) {
      errorResponse({
        httpCode: 422,
        message: 'Please fill in user id'
      }, req, res, next)
    }

    // profile field is mandatory
    if (!profile) {
      errorResponse({
        httpCode: 422,
        message: 'Please fill in profile id'
      }, req, res, next)
    }

    // title field is mandatory
    if (!title) {
      errorResponse({
        httpCode: 422,
        message: 'Please fill in message title'
      }, req, res, next)
    }

    // content field is mandatory
    if (!content) {
      errorResponse({
        httpCode: 422,
        message: 'Please fill in message content'
      }, req, res, next)
    }

    if (mbti) {
      // test mbti value
      if (!MBTI_OPTIONS.includes(mbti)) {
        errorResponse({
          httpCode: 422,
          message: 'Please fill in valid mbti value'
        }, req, res, next)
      }
    }

    if (enneagram) {
      // test enneagram value
      if (!ENNEAGRAM_OPTIONS.includes(enneagram)) {
        errorResponse({
          httpCode: 422,
          message: 'Please fill in valid enneagram value'
        }, req, res, next)
      }
    }

    if (zodiac) {
      // test zodiac value
      if (!ZODIAC_OPTIONS.includes(zodiac)) {
        errorResponse({
          httpCode: 422,
          message: 'Please fill in valid zodiac value'
        }, req, res, next)
      }
    }

    next()
  }
}

module.exports = {
  commentExists,
  commentValidation
}
