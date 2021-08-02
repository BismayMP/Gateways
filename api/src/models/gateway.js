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
    default: undefined,
    required: false,
    validate: (v) => v == null || v.length > 0 || v.length < 10,
  },
})

const Gateway = model('gateways', gatewaySchema)

module.exports = Gateway
