require('dotenv').config()
const PORT = process.env.PORT
const app = require('./server.js')
const mongoose = require('mongoose')
const { connect, connection } = mongoose

const mongodbHost = process.env.MONGO_URL
const mongodbName = process.env.DB_NAME

const mongoUri =
  `${mongodbHost + mongodbName}` || `mongodb://localhost:27017/gateways`
connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: true,
})

const db = connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function () {
  console.log('mongoDb connected')
})

app.listen(PORT)
console.log(`Running an API 🚀 Server on port ${PORT}`)
