require('dotenv').config()
const express = require('express')
const { json, urlencoded } = express
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const mongoose = require('mongoose')
const { connect, connection } = mongoose
const gatewaysRouter = require('./routes/gateways')

const app = express()

app.use(logger('dev'))
app.use(json())
app.use(urlencoded({ extended: false }))
app.use(cookieParser())

app.use('/api/gateways', gatewaysRouter)

module.exports = app
