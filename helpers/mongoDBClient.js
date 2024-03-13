const mongoose = require('mongoose')

function initDBConnection (uri) {
  try {
    // initiate mongodb connection
    mongoose.connect(uri)

    console.info('MongoDB connected successfully')
  } catch (err) {
    console.error(`MongoDB connection was failed: ${err.message}`, err.message)
  }
}

module.exports = { initDBConnection }
