const { Schema, model } = require('mongoose')

const peripheralSchema = new Schema({
  vendor: { type: String, required: true },
  date: { type: Date, required: true, default: Date.now },
  status: { type: String, required: true, options: ['online', 'offline'] },
})

const Peripheral = model('Peripheral', peripheralSchema)

module.exports = { Peripheral, peripheralSchema }
