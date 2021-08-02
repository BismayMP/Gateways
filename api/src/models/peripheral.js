const { Schema, model } = require('mongoose')

const peripheralSchema = new Schema({
  UID: Number,
  vendor: { type: String, required: true },
  date: { type: Date, required: true, default: Date.now },
  status: { type: String, required: true, options: ['online', 'offline'] },
})

module.exports = peripheralSchema
