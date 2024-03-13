'use strict'

const express = require('express')

// preparing http service
const app = express()

app.use(express.urlencoded({ limit: '10mb', extended: true }))
app.use(express.json({ limit: '10mb' }))

// set the view engine to ejs
app.set('view engine', 'ejs')

// routes
app.use('/', require('../routes/index')())
app.use('/profiles', require('../routes/profiles')())
app.use('/comments', require('../routes/comments')())
app.use('/users', require('../routes/users')())

module.exports = app
