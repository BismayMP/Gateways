const Gateway = require('../models/gateway')
const isIp = require('is-ip')

const validateIpv4 = async (ipv4) => {
  if (!isIp.v4(ipv4)) {
    return 'ipv4 is invalid'
  }
}

const retriveAllgateways = async () => {
  return await Gateway.find()
}

const retriveGatewayById = async (id) => {
  return await Gateway.findById(id)
}

const createGateway = async (gateway) => {
  if (
    !isIp.v4(gateway.ipv4) ||
    (gateway.peripheral &&
      gateway.peripheral.length &&
      gateway.peripheral.length > 10)
  ) {
    return { code: 400 }
  }
  const obj = new Gateway(gateway)
  return await obj.save()
}

const updateGateway = async (id, gateway) => {
  if (
    !isIp.v4(gateway.ipv4) ||
    (gateway.peripheral &&
      gateway.peripheral.length &&
      gateway.peripheral.length > 10)
  ) {
    return { code: 400 }
  }
  return await Gateway.findOneAndUpdate({ _id: id }, gateway, { new: true })
}

const deleteGateway = async (id) => {
  return await Gateway.deleteOne({ _id: id })
}

module.exports = {
  validateIpv4,
  createGateway,
  retriveAllgateways,
  retriveGatewayById,
  updateGateway,
  deleteGateway,
}
