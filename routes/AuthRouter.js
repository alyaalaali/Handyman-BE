const router = require("express").Router()
const controller = require("../controllers/AuthController")
const middleware = require("../middleware/index")
router.post("/register/user", controller.RegisterUser)
router.post("/register/provider", controller.RegisterProvider)
router.post("/login", controller.Login)

router.get(
  "/session",
  middleware.stripToken,
  middleware.verifyToken,
  controller.CheckSession
)

module.exports = router
