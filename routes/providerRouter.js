const router = require("express").Router()
const controller = require('../controllers/ProviderController')

router.get('/categories/:id', controller.categoriesList)
router.get('/categories/requests', controller.categoryRequests)
router.get('/requests/:id', controller.singleRequest)
router.post('/requests/:id', controller.applyRequest )
router.delete('/requests/:id', controller.deleteRequest)

module.exports = router

