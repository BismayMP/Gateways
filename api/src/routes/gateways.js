const { Router } = require('express')
const mongoose = require('mongoose')
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
    const id = req.params.id
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send('Invalid object id')
    }
    const gateway = await retriveGatewayById(id)
    if (!gateway) {
      return res.status(404).send('Gateway not found')
    }
    return res.status(200).send(gateway)
  } catch (error) {
    res.status(500).send(error)
  }
})

/* POST Insert gateways */
router.post('/', async (req, res, next) => {
  try {
    const gateway = req.body
    const obj = await createGateway(gateway)
    res.status(obj.code || 200).send(obj)
  } catch (error) {
    res.status(500).send(error)
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    const id = req.params.id
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send('Invalid object id')
    }
    const gateway = req.body
    const obj = await updateGateway(id, gateway)
    if (!obj) {
      return res.status(404).send('Gateway not found')
    }
    return res.send(obj)
  } catch (error) {
    res.status(500).send(error)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    const gateway = await deleteGateway(req.params.id)
    res.status(200).send(gateway)
  } catch (error) {
    res.status(500).send(error)
  }
})

module.exports = router
