'use strict'

const { startMongoDBServer, stopMongoDBServer } = require('./helpers/mongoDBServer')
const { initDBConnection } = require('./helpers/mongoDBClient')
const express = require('express')

async function start () {
  // start mongoDB service
  const { uri } = await startMongoDBServer()
  initDBConnection(uri)

  // preparing http service
  const app = express()
  const port = process.env.PORT || 3000

  // set the view engine to ejs
  app.set('view engine', 'ejs')

  // routes
  app.use('/', require('./routes/index')())
  app.use('/profiles', require('./routes/profiles')())
  app.use('/comments', require('./routes/comments')())
  app.use('/users', require('./routes/users')())

  // start server
  const server = app.listen(port)
  console.log('Express started. Listening on %s', port)

  // graceful shutdown handler
  process.on('SIGTERM', () => {
    console.log('SIGTERM signal received: closing HTTP server')
    server.close(async () => {
      await stopMongoDBServer()
    })
  })
}

start()
