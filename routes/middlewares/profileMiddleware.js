const ProfileModel = require('../../models/profilesModel')
const errorResponse = require('../../helpers/errorResponse')
const { MBTI_OPTIONS, ENNEAGRAM_OPTIONS } = require('../../constants/personality')

function profileExists (options = {}) {
  return async function (req, res, next) {
    let _id = req.params.id

    // optional for id in the body params
    const { idField } = options
    if (idField) _id = req.body[idField]

    // check if profile exists
    const profile = await ProfileModel.findOne({ _id })
    if (!profile) {
      errorResponse({
        httpCode: 404,
        message: 'Please use existing profile id'
      }, req, res, next)
      return
    }

    next()
  }
}

function profileValidation () {
  return function (req, res, next) {
    const {
      name,
      mbti,
      enneagram,
      variant,
      tritype,
      socionics,
      sloan,
      psyche
    } = req.body

    // name field is mandatory
    if (!name) {
      errorResponse({
        httpCode: 422,
        message: 'Please fill in profile name'
      }, req, res, next)
      return
    }

    // mbti field is mandatory
    if (!mbti) {
      errorResponse({
        httpCode: 422,
        message: 'Please fill in mbti'
      }, req, res, next)
      return
    } else {
      // test mbti value
      if (!MBTI_OPTIONS.includes(mbti)) {
        errorResponse({
          httpCode: 422,
          message: 'Please fill in valid mbti value'
        }, req, res, next)
        return
      }
    }

    // enneagram field is mandatory
    if (!enneagram) {
      errorResponse({
        httpCode: 422,
        message: 'Please fill in enneagram'
      }, req, res, next)
      return
    } else {
      // test enneagram value
      if (!ENNEAGRAM_OPTIONS.includes(enneagram)) {
        errorResponse({
          httpCode: 422,
          message: 'Please fill in valid enneagram value'
        }, req, res, next)
        return
      }
    }

    // variant field is mandatory
    if (!variant) {
      errorResponse({
        httpCode: 422,
        message: 'Please fill in variant'
      }, req, res, next)
      return
    }

    // tritype field is mandatory
    if (!tritype) {
      errorResponse({
        httpCode: 422,
        message: 'Please fill in tritype'
      }, req, res, next)
      return
    }

    // socionics field is mandatory
    if (!socionics) {
      errorResponse({
        httpCode: 422,
        message: 'Please fill in message socionics'
      }, req, res, next)
      return
    }

    // sloan field is mandatory
    if (!sloan) {
      errorResponse({
        httpCode: 422,
        message: 'Please fill in message sloan'
      }, req, res, next)
      return
    }

    // psyche field is mandatory
    if (!psyche) {
      errorResponse({
        httpCode: 422,
        message: 'Please fill in message psyche'
      }, req, res, next)
      return
    }

    next()
  }
}

module.exports = {
  profileExists,
  profileValidation
}
