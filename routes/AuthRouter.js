const router = require('express').Router()
const controller = require('../controllers/AuthController')

router.post('/register/user', controller.RegisterUser)
router.post('/register/provider', controller.RegisterProvider)
router.post('/login', controller.Login)

module.exports = router
