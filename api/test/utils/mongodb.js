const mongoose = require('mongoose')
const { MongoMemoryServer } = require('mongodb-memory-server')

let mongoServer

const dbConnect = async () => {
  mongoServer = await MongoMemoryServer.create()
  const uri = mongoServer.getUri()

  const mongooseOpts = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
  }

  await mongoose.connect(uri, mongooseOpts)
}

const dbDisconnect = async () => {
  await mongoose.connection.dropDatabase()
  await mongoose.connection.close()
  if (mongoServer) await mongoServer.stop()
}

module.exports = { dbConnect, dbDisconnect }
