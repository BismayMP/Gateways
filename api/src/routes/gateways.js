const { Router } = require('express')
const {
  createGateway,
  retriveAllgateways,
  retriveGatewayById,
  updateGateway,
  deleteGateway,
} = require('../controllers/gateways')
const router = Router()

/* GET gateways listing. */
router.get('/', async (req, res, next) => {
  try {
    const gateways = await retriveAllgateways()
    res.status(200).send(gateways)
  } catch (error) {
    res.status(500).send(error)
  }
})

//GET Retrive gateways by id
router.get('/:id', async (req, res, next) => {
  try {
    const gateway = await retriveGatewayById(req.query.id)
    if (gateway) {
      res.status(200).send(gateway)
    } else {
      res.sendStatus(404)
    }
  } catch (error) {
    res.status(500).send(error)
  }
})

/* POST Insert gateways */
router.post('/', async (req, res, next) => {
  try {
    const gateway = req.body
    console.log(gateway)
    const obj = await createGateway(gateway)
    res.status(obj.code || 200).send(obj)
  } catch (error) {
    res.status(500).send(error)
  }
})

router.put('/', async (req, res, next) => {
  try {
    const gateway = req.body
    const obj = await updateGateway(gateway._id, gateway)
    if (obj) {
      res.sendStatus(201)
    } else {
      res.sendStatus(404)
    }
  } catch (error) {
    res.status(500).send(error)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    const gateway = await deleteGateway(req.query.id)
    res.status(200).send(gateway)
  } catch (error) {
    res.status(500).send(error)
  }
})

module.exports = router
