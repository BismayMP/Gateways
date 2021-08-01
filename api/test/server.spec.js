const request = require('supertest')
const app = require('../src/server')

describe('Test the root path', () => {
  beforeAll(() => {
    mongoDB.connect()
  })

  afterAll((done) => {
    mongoDB.disconnect(done)
  })

  test('It should response the GET method', async () => {
    const response = await request(app).get('/api/gateways')
    expect(response.statusCode).toBe(200)
  })
})
