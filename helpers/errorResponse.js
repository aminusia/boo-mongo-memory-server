function errorResponse (errorData, req, res, next) {
  const { httpCode, message } = errorData
  res.status(httpCode).send({
    success: false,
    error: message
  })
}

module.exports = errorResponse
