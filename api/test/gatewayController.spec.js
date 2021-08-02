const { MongoClient } = require('mongodb')
const { expect } = require('chai')
const {
  createGateway,
  deleteGateway,
  updateGateway,
  validateIpv4,
  retriveAllgateways,
  retriveGatewayById,
} = require('../src/controllers/gateways')
const Gateway = require('../src/models/gateway')
const { dbConnect, dbDisconnect } = require('./utils/mongodb')

const mocks = require('./__mocks__/gateway')

describe('Gateways controller operations ', () => {
  beforeEach(async () => await dbConnect())
  beforeEach(async () => await Gateway.deleteMany({}))
  afterEach(async () => await dbDisconnect())

  it('should insert a doc into gateways', async () => {
    await createGateway(mocks.gateway)
    const insertedGateway = await Gateway.findOne({ ipv4: mocks.gateway.ipv4 })
    expect(insertedGateway.name).to.equal(mocks.gateway.name)
    expect(insertedGateway.ipv4).to.equal(mocks.gateway.ipv4)
  })

  it('should get the inserted gateway using the id', async () => {
    const gateway = new Gateway(mocks.gateway)
    await gateway.save()
    const insertedGateway = await retriveGatewayById(gateway._id)
    expect(insertedGateway.name).to.equal(mocks.gateway.name)
    expect(insertedGateway.ipv4).to.equal(mocks.gateway.ipv4)
  })

  it('should get all the gateways in the database', async () => {
    await Gateway.insertMany(mocks.gatewaysArray)
    const gatewaysArray = await retriveAllgateways()
    expect(gatewaysArray.length).to.equal(2)
  })

  it('should update the resource', async () => {
    const gateway = new Gateway({
      name: 'gateway_5',
      ipv4: '192.168.1.5',
    })
    await gateway.save()
    const newGateway = await updateGateway(gateway._id, {
      name: 'gateway_6',
      ipv4: '192.168.1.6',
    })
    const updatedObject = await Gateway.findById(gateway._id)
    expect(updatedObject.name).to.equal(newGateway.name)
    expect(updatedObject.ipv4).to.equal(newGateway.ipv4)
  })
  it('should delete the resource', async () => {
    const gateway = new Gateway({
      name: 'gateway_5',
      ipv4: '192.168.1.5',
    })
    await gateway.save()
    await deleteGateway(gateway._id)
    const deletedObject = await Gateway.findById(gateway._id)
    expect(deletedObject).to.be.null
  })
})
