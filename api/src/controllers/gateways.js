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
  if (!isIp.v4(gateway.ipv4)) {
    return { code: 400 }
  }
  const obj = new Gateway(gateway)
  console.log(obj)
  const res = await obj.save()
  console.log(res)
  return res
}

const updateGateway = async (id, gateway) => {
  return await Gateway.updateOne({ _id: id }, gateway)
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
