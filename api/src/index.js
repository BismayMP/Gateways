require('dotenv').config()
const PORT = process.env.PORT
const app = require('./server.js')
const mongoose = require('mongoose')
const { connect, connection } = mongoose

const mongoUri = 'mongodb://localhost:27017:27017/gateways' //process.env.MONGO_URL
connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

const db = connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function () {
  console.log('mongoDb connected')
})

app.listen(PORT)
console.log(`Running an API 🚀 Server on port ${PORT}`)
