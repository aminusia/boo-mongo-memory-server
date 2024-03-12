const { MongoMemoryServer }  = require('mongodb-memory-server')

let mongod

async function startMongoDBServer() {
  // This will create an new instance of "MongoMemoryServer" and automatically start it
  mongod = mongod || await MongoMemoryServer.create()
  const uri = mongod.getUri()
  console.log(`MongoDB server serving at ${uri}`)

  return {mongod, uri}
}

async function stopMongoDBServer() {
  // This will stop the mongoDB Server
  await mongod.stop()
  console.log('MongoDB server stopped')
}

module.exports = {
  startMongoDBServer,
  stopMongoDBServer
}

