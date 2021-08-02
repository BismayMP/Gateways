const { Schema, model } = require('mongoose')
const peripheralSchema = require('./peripheral')
const isIp = require('is-ip')

const gatewaySchema = new Schema({
  name: { type: String, required: true },
  ipv4: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (v) => {
        return isIp.v4(v)
      },
      message: (props) => `${props.value} is not a valid ipv4!`,
    },
  },
  peripheral: {
    type: [peripheralSchema],
    max: 10,
    validate: {
      validator: (v) => {
        return v.length <= 10
      },
      message: (props) =>
        `No gateway should have more than 10 peripheral devices!`,
    },
  },
})

const Gateway = model('gateways', gatewaySchema)

module.exports = Gateway
