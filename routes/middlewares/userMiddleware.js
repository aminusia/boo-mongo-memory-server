const UserModel = require('../../models/usersModel')
const errorResponse = require('../helpers/errorResponse')

function userExists (options = {}) {
  return async function (req, res, next) {
    let _id = req.params.id

    // optional for id in the body params
    const { idField } = options
    if (idField) _id = req.body[idField]

    // check if user exists
    const user = await UserModel.findOne({ _id })
    if (!user) {
      errorResponse({
        httpCode: 404,
        message: 'Please use existing user id'
      }, req, res, next)
    }

    next()
  }
}

function userValidation () {
  return function (req, res, next) {
    const { name } = req.body

    // user field is mandatory
    if (!name) {
      errorResponse({
        httpCode: 422,
        message: 'Please fill in user\'s display name'
      }, req, res, next)
    }

    next()
  }
}

module.exports = {
  userExists,
  userValidation
}
