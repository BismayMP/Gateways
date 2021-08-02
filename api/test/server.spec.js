const { expect } = require('chai')
const request = require('supertest')
const Gateway = require('../src/models/gateway')
const app = require('../src/server')
const { dbConnect, dbDisconnect } = require('./utils/mongodb')
const mocks = require('./__mocks__/gateway')

describe('server routes testing', () => {
  before(async () => await dbConnect())
  beforeEach(async () => await Gateway.deleteMany({}))
  after(async () => await dbDisconnect())

  describe('GET /', () => {
    it('should return all gateways', async () => {
      await Gateway.insertMany(mocks.gatewaysArray)
      const res = await request(app).get('/api/gateways')
      expect(res.status).to.equal(200)
      expect(res.body.length).to.equal(2)
      expect(res.body[0].name).to.equal(mocks.gatewaysArray[0].name)
    })
  })

  describe('GET/:id', () => {
    it('should return a gateway if valid id is passed', async () => {
      const gateway = new Gateway(mocks.gateway)
      await gateway.save()
      const res = await request(app).get('/api/gateways/' + gateway._id)
      expect(res.status).to.equal(200)
      expect(res.body).to.have.property('name', gateway.name)
    })
    it('should return 400 error when invalid object id is passed', async () => {
      const res = await request(app).get('/api/gateways/1')
      expect(res.status).to.equal(400)
    })
    it('should return 404 error when valid object id is passed but does not exist', async () => {
      const res = await request(app).get(
        '/api/gateways/5f43ef20c1d4a133e4628181',
      )
      expect(res.status).to.equal(404)
    })
  })
  describe('POST /', () => {
    it('should return gateway when the all request body is valid', async () => {
      const res = await request(app)
        .post('/api/gateways')
        .send(mocks.gatewayWithPeripherals)
      const data = res.body
      expect(res.status).to.equal(200)
      expect(data).to.have.property('_id')
      expect(data).to.have.property('name', mocks.gatewayWithPeripherals.name)
      expect(data).to.have.property('ipv4', mocks.gatewayWithPeripherals.ipv4)
      expect(data.peripheral).to.have.length.within(0, 10)

      const insertedResource = await Gateway.findOne({
        ipv4: mocks.gatewayWithPeripherals.ipv4,
      })
      expect(insertedResource.name).to.equal(mocks.gatewayWithPeripherals.name)
      expect(insertedResource.ipv4).to.equal(mocks.gatewayWithPeripherals.ipv4)
    })
    it('should throw an error when ipv4 is not valid', async () => {
      const res = await request(app)
        .post('/api/gateways')
        .send({ ...mocks.gatewayWithPeripherals, ipv4: '123' })
      expect(res.status).to.equal(400)
    })
    it('should throw an error when peripherals are more than 10', async () => {
      const peripheral = mocks.gatewayWithPeripherals.peripheral
      peripheral.push({
        vendor: 'vendor12',
        status: 'online',
      })
      const res = await request(app)
        .post('/api/gateways')
        .send({
          ...mocks.gatewayWithPeripherals,
          peripheral,
        })
      expect(res.status).to.equal(400)
    })
  })
  describe('PUT /:id', () => {
    it('should update the existing user and return 200', async () => {
      const gateway = new Gateway({
        name: 'gateway_5',
        ipv4: '192.168.1.5',
      })
      await gateway.save()
      const res = await request(app)
        .put('/api/gateways/' + gateway._id)
        .send({
          name: 'gateway_6',
          ipv4: '192.168.1.6',
        })
      expect(res.status).to.equal(200)
      expect(res.body).to.have.property('name', 'gateway_6')
      expect(res.body).to.have.property('ipv4', '192.168.1.6')
    })
  })
  describe('DELETE /:id', () => {
    const gateway = new Gateway({
      name: 'gateway_7',
      ipv4: '192.168.1.7',
    })
    it('should delete requested id and return response 200', async () => {
      await gateway.save()
      const res = await request(app).delete('/api/gateways/' + gateway._id)
      expect(res.status).to.be.equal(200)
    })

    it('should return 404 when deleted user is requested', async () => {
      let res = await request(app).get('/api/gateways/' + gateway._id)
      expect(res.status).to.be.equal(404)
    })
  })
})
